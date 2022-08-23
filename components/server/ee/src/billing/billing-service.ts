/**
 * Copyright (c) 2022 Gitpod GmbH. All rights reserved.
 * Licensed under the Gitpod Enterprise Source Code License,
 * See License.enterprise.txt in the project root folder.
 */

import { CostCenterDB } from "@gitpod/gitpod-db/lib";
import { User } from "@gitpod/gitpod-protocol";
import { AttributionId } from "@gitpod/gitpod-protocol/lib/attribution";
import { log } from "@gitpod/gitpod-protocol/lib/util/logging";
import { GetUpcomingInvoiceResponse } from "@gitpod/usage-api/lib/usage/v1/billing_pb";
import {
    CachingUsageServiceClientProvider,
    CachingBillingServiceClientProvider,
} from "@gitpod/usage-api/lib/usage/v1/sugar";
import { inject, injectable } from "inversify";
import { UserService } from "../../../src/user/user-service";

export interface SpendingLimitReachedResult {
    reached: boolean;
    almostReached?: boolean;
    attributionId: AttributionId;
}

@injectable()
export class BillingService {
    @inject(UserService) protected readonly userService: UserService;
    @inject(CostCenterDB) protected readonly costCenterDB: CostCenterDB;
    @inject(CachingUsageServiceClientProvider)
    protected readonly usageServiceClientProvider: CachingUsageServiceClientProvider;
    @inject(CachingBillingServiceClientProvider)
    protected readonly billingServiceClientProvider: CachingBillingServiceClientProvider;

    async checkSpendingLimitReached(user: User): Promise<SpendingLimitReachedResult> {
        const attributionId = await this.userService.getWorkspaceUsageAttributionId(user);
        const costCenter = await this.costCenterDB.findById(AttributionId.render(attributionId));
        if (!costCenter) {
            const err = new Error("No CostCenter found");
            log.error({ userId: user.id }, err.message, err, { attributionId });
            // Technially we do not have any spending limit set, yet. But sending users down the "reached" path will fix this issues as well.
            return {
                reached: true,
                attributionId,
            };
        }

        if (attributionId.kind === "team") {
            const upcomingInvoice = await this.getUpcomingInvoice(attributionId.teamId);
            const currentUsage = upcomingInvoice.getCredits();
            if (currentUsage >= costCenter.spendingLimit) {
                log.info({ userId: user.id }, "Spending limit reached", {
                    attributionId,
                    currentUsage,
                    spendingLimit: costCenter.spendingLimit,
                });
                return {
                    reached: true,
                    attributionId,
                };
            } else if (currentUsage > costCenter.spendingLimit * 0.8) {
                log.info({ userId: user.id }, "Spending limit almost reached", {
                    attributionId,
                    currentUsage,
                    spendingLimit: costCenter.spendingLimit,
                });
                return {
                    reached: false,
                    almostReached: true,
                    attributionId,
                };
            }
        }

        if (attributionId.kind === "user") {
            // TODO
        }

        return {
            reached: false,
            attributionId,
        };
    }

    async getUpcomingInvoice(teamId: string): Promise<GetUpcomingInvoiceResponse> {
        const response = await this.billingServiceClientProvider.getDefault().getUpcomingInvoice(teamId);
        return response;
    }
}

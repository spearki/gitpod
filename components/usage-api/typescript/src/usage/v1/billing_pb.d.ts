/**
 * Copyright (c) 2022 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// package: usage.v1
// file: usage/v1/billing.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as usage_v1_usage_pb from "../../usage/v1/usage_pb";

export class UpdateInvoicesRequest extends jspb.Message {

    hasStartTime(): boolean;
    clearStartTime(): void;
    getStartTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setStartTime(value?: google_protobuf_timestamp_pb.Timestamp): UpdateInvoicesRequest;

    hasEndTime(): boolean;
    clearEndTime(): void;
    getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): UpdateInvoicesRequest;
    clearSessionsList(): void;
    getSessionsList(): Array<usage_v1_usage_pb.BilledSession>;
    setSessionsList(value: Array<usage_v1_usage_pb.BilledSession>): UpdateInvoicesRequest;
    addSessions(value?: usage_v1_usage_pb.BilledSession, index?: number): usage_v1_usage_pb.BilledSession;
    getReportId(): string;
    setReportId(value: string): UpdateInvoicesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateInvoicesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateInvoicesRequest): UpdateInvoicesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateInvoicesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateInvoicesRequest;
    static deserializeBinaryFromReader(message: UpdateInvoicesRequest, reader: jspb.BinaryReader): UpdateInvoicesRequest;
}

export namespace UpdateInvoicesRequest {
    export type AsObject = {
        startTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        endTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        sessionsList: Array<usage_v1_usage_pb.BilledSession.AsObject>,
        reportId: string,
    }
}

export class UpdateInvoicesResponse extends jspb.Message {

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateInvoicesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateInvoicesResponse): UpdateInvoicesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateInvoicesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateInvoicesResponse;
    static deserializeBinaryFromReader(message: UpdateInvoicesResponse, reader: jspb.BinaryReader): UpdateInvoicesResponse;
}

export namespace UpdateInvoicesResponse {
    export type AsObject = {
    }
}

export class GetLatestInvoiceRequest extends jspb.Message {

    hasTeamId(): boolean;
    clearTeamId(): void;
    getTeamId(): string;
    setTeamId(value: string): GetLatestInvoiceRequest;

    hasUserId(): boolean;
    clearUserId(): void;
    getUserId(): string;
    setUserId(value: string): GetLatestInvoiceRequest;

    getIdentifierCase(): GetLatestInvoiceRequest.IdentifierCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLatestInvoiceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetLatestInvoiceRequest): GetLatestInvoiceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLatestInvoiceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLatestInvoiceRequest;
    static deserializeBinaryFromReader(message: GetLatestInvoiceRequest, reader: jspb.BinaryReader): GetLatestInvoiceRequest;
}

export namespace GetLatestInvoiceRequest {
    export type AsObject = {
        teamId: string,
        userId: string,
    }

    export enum IdentifierCase {
        IDENTIFIER_NOT_SET = 0,
        TEAM_ID = 1,
        USER_ID = 2,
    }

}

export class GetLatestInvoiceResponse extends jspb.Message {
    getInvoiceId(): string;
    setInvoiceId(value: string): GetLatestInvoiceResponse;
    getCurrency(): string;
    setCurrency(value: string): GetLatestInvoiceResponse;
    getAmount(): number;
    setAmount(value: number): GetLatestInvoiceResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLatestInvoiceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetLatestInvoiceResponse): GetLatestInvoiceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLatestInvoiceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLatestInvoiceResponse;
    static deserializeBinaryFromReader(message: GetLatestInvoiceResponse, reader: jspb.BinaryReader): GetLatestInvoiceResponse;
}

export namespace GetLatestInvoiceResponse {
    export type AsObject = {
        invoiceId: string,
        currency: string,
        amount: number,
    }
}

export class FinalizeInvoiceRequest extends jspb.Message {
    getInvoiceId(): string;
    setInvoiceId(value: string): FinalizeInvoiceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FinalizeInvoiceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FinalizeInvoiceRequest): FinalizeInvoiceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FinalizeInvoiceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FinalizeInvoiceRequest;
    static deserializeBinaryFromReader(message: FinalizeInvoiceRequest, reader: jspb.BinaryReader): FinalizeInvoiceRequest;
}

export namespace FinalizeInvoiceRequest {
    export type AsObject = {
        invoiceId: string,
    }
}

export class FinalizeInvoiceResponse extends jspb.Message {

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FinalizeInvoiceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FinalizeInvoiceResponse): FinalizeInvoiceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FinalizeInvoiceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FinalizeInvoiceResponse;
    static deserializeBinaryFromReader(message: FinalizeInvoiceResponse, reader: jspb.BinaryReader): FinalizeInvoiceResponse;
}

export namespace FinalizeInvoiceResponse {
    export type AsObject = {
    }
}

export class SetBilledSessionRequest extends jspb.Message {
    getInstanceId(): string;
    setInstanceId(value: string): SetBilledSessionRequest;

    hasFrom(): boolean;
    clearFrom(): void;
    getFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setFrom(value?: google_protobuf_timestamp_pb.Timestamp): SetBilledSessionRequest;
    getSystem(): System;
    setSystem(value: System): SetBilledSessionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetBilledSessionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetBilledSessionRequest): SetBilledSessionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetBilledSessionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetBilledSessionRequest;
    static deserializeBinaryFromReader(message: SetBilledSessionRequest, reader: jspb.BinaryReader): SetBilledSessionRequest;
}

export namespace SetBilledSessionRequest {
    export type AsObject = {
        instanceId: string,
        from?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        system: System,
    }
}

export class SetBilledSessionResponse extends jspb.Message {

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetBilledSessionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetBilledSessionResponse): SetBilledSessionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetBilledSessionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetBilledSessionResponse;
    static deserializeBinaryFromReader(message: SetBilledSessionResponse, reader: jspb.BinaryReader): SetBilledSessionResponse;
}

export namespace SetBilledSessionResponse {
    export type AsObject = {
    }
}

export enum System {
    SYSTEM_UNKNOWN = 0,
    SYSTEM_CHARGEBEE = 1,
    SYSTEM_STRIPE = 2,
}

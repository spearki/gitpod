#!/bin/sh
# Copyright (c) 2022 Gitpod GmbH. All rights reserved.
# Licensed under the MIT License. See License-MIT.txt in the project root for license information.


set -e

echo "Gitpod: Killing any in-progress installations"

kubectl delete jobs.batch -n "${NAMESPACE}" -l component="gitpod-installer,cursor!=${CURSOR}" --force --grace-period 0 || true
kubectl delete pod -n "${NAMESPACE}" -l component="gitpod-installer,cursor!=${CURSOR}" --force --grace-period 0 || true

if [ "$(helm status -n "${NAMESPACE}" gitpod -o json | jq '.info.status == "deployed"')" = "false" ];
then
    echo "Gitpod: Deployment in-progress - clearing"

    VERSION="$(helm status -n "${NAMESPACE}" gitpod -o json | jq '.version')"
    if [ "${VERSION}" -le 1 ];
    then
        echo "Gitpod: Uninstall application"
        helm uninstall -n "${NAMESPACE}" gitpod --wait || true
    else
        echo "Gitpod: Rolling back application"
        helm rollback -n "${NAMESPACE}" gitpod --wait || true
    fi
fi

echo "Gitpod: Generate the base Installer config"
/app/installer config init

echo "Gitpod: auto-detecting ShiftFS support on host machine"
/app/installer config cluster shiftfs

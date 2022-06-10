// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the MIT License. See License-MIT.txt in the project root for license information.

package fluentbit

import (
	"github.com/gitpod-io/gitpod/installer/pkg/common"
	"github.com/gitpod-io/gitpod/installer/pkg/helm"
	"github.com/gitpod-io/gitpod/installer/third_party/charts"
	"helm.sh/helm/v3/pkg/cli/values"
)

var Helm = common.CompositeHelmFunc(
	helm.ImportTemplate(charts.Fluentbit(), helm.TemplateConfig{}, func(cfg *common.RenderContext) (*common.HelmConfig, error) {
		return &common.HelmConfig{
			Enabled: false, // @todo(sje): make conditional
			Values: &values.Options{
				Values: []string{},
			},
		}, nil
	}),
)

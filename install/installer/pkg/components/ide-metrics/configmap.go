// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package ide_metrics

import (
	"fmt"

	"github.com/gitpod-io/gitpod/ide-metrics-api/config"
	"github.com/gitpod-io/gitpod/installer/pkg/common"

	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

func configmap(ctx *common.RenderContext) ([]runtime.Object, error) {
	counterMetrics := []config.CounterMetricsConfiguration{
		{
			Name: "gitpod_supervisor_frontend_error_total",
			Help: "Total count of supervisor frontend client errors",
		},
		{
			Name: "gitpod_supervisor_frontend_client_total",
			Help: "Total count of supervisor frontend client",
			Labels: []config.LabelAllowList{
				{
					Name: "resource",
					AllowValues: []string{
						"vscode-web-workbench",
					},
					DefaultValue: "unknown",
				},
				{
					Name: "error",
					AllowValues: []string{
						"load_error",
					},
					DefaultValue: "unknown",
				},
			},
		},
	}
	histogramMetrics := []config.HistogramMetricsConfiguration{}

	cfg := config.ServiceConfiguration{
		Server: config.MetricsServerConfiguration{
			Port: ContainerPort,
			// RateLimits: , // TODO(pd) ratelimit
			CounterMetrics:   counterMetrics,
			HistogramMetrics: histogramMetrics,
		},
		Prometheus: struct {
			Addr string `json:"addr"`
		}{Addr: common.LocalhostPrometheusAddr()},
	}

	fc, err := common.ToJSONString(cfg)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal ide-metrics config: %w", err)
	}

	res := []runtime.Object{
		&corev1.ConfigMap{
			TypeMeta: common.TypeMetaConfigmap,
			ObjectMeta: metav1.ObjectMeta{
				Name:        Component,
				Namespace:   ctx.Namespace,
				Labels:      common.CustomizeLabel(ctx, Component, common.TypeMetaConfigmap),
				Annotations: common.CustomizeAnnotation(ctx, Component, common.TypeMetaConfigmap),
			},
			Data: map[string]string{
				"config.json": string(fc),
			},
		},
	}
	return res, nil
}

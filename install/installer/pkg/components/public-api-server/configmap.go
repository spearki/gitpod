// Copyright (c) 2021 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package public_api_server

import (
	"fmt"
	"net"
	"strconv"

	"github.com/gitpod-io/gitpod/common-go/baseserver"
	"github.com/gitpod-io/gitpod/public-api/config"

	"github.com/gitpod-io/gitpod/installer/pkg/common"
	"github.com/gitpod-io/gitpod/installer/pkg/components/usage"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

const (
	configJSONFilename = "config.json"
)

func configmap(ctx *common.RenderContext) ([]runtime.Object, error) {
	cfg := config.Configuration{
		GitpodServiceURL:      fmt.Sprintf("wss://%s/api/v1", ctx.Config.Domain),
		BillingServiceAddress: net.JoinHostPort(usage.Component, strconv.Itoa(usage.GRPCServicePort)),
		Server: &baseserver.Configuration{
			Services: baseserver.ServicesConfiguration{
				GRPC: &baseserver.ServerConfiguration{
					Address: fmt.Sprintf(":%d", GRPCContainerPort),
				},
				HTTP: &baseserver.ServerConfiguration{
					Address: fmt.Sprintf(":%d", HTTPContainerPort),
				},
			},
		},
	}

	fc, err := common.ToJSONString(cfg)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal config: %w", err)
	}

	return []runtime.Object{
		&corev1.ConfigMap{
			TypeMeta: common.TypeMetaConfigmap,
			ObjectMeta: metav1.ObjectMeta{
				Name:        Component,
				Namespace:   ctx.Namespace,
				Labels:      common.CustomizeLabel(ctx, Component, common.TypeMetaConfigmap),
				Annotations: common.CustomizeAnnotation(ctx, Component, common.TypeMetaConfigmap),
			},
			Data: map[string]string{
				configJSONFilename: string(fc),
			},
		},
	}, nil
}

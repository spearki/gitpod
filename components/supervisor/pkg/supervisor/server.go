// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package supervisor

import (
	"context"

	"github.com/gitpod-io/gitpod/common-go/log"
	gitpod "github.com/gitpod-io/gitpod/gitpod-protocol"
	"github.com/gitpod-io/gitpod/supervisor/api"
	"github.com/pkg/errors"
	"golang.org/x/xerrors"
)

var gitpodApiEndpointNotFound = errors.New("cannot find Gitpod API endpoint")

func createServerService(cfg *Config, tknsrv api.TokenServiceServer, scope []string) (*gitpod.APIoverJSONRPC, error) {
	endpoint, host, err := cfg.GitpodAPIEndpoint()
	if err != nil {
		log.WithError(err).Error("cannot find Gitpod API endpoint")
		return nil, gitpodApiEndpointNotFound
	}
	tknres, err := tknsrv.GetToken(context.Background(), &api.GetTokenRequest{
		Kind:  KindGitpod,
		Host:  host,
		Scope: scope,
	})
	if err != nil {
		return nil, xerrors.Errorf("cannot get token for Gitpod API: %w", err)
	}
	gitpodService, err := gitpod.ConnectToServer(endpoint, gitpod.ConnectToServerOpts{
		Token: tknres.Token,
		Log:   log.Log,
		ExtraHeaders: map[string]string{
			"User-Agent":              "gitpod/supervisor",
			"X-Workspace-Instance-Id": cfg.WorkspaceInstanceID,
			"X-Client-Version":        Version,
		},
	})
	if err != nil {
		err = xerrors.Errorf("cannot connect to Gitpod API: %w", err)
	}
	return gitpodService, err
}

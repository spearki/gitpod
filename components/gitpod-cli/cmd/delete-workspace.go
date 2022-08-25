// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package cmd

import (
	"context"
	"time"

	gitpod "github.com/gitpod-io/gitpod/gitpod-cli/pkg/gitpod"
	"github.com/spf13/cobra"
)

// deleteWorkspaceCmd represents the delete command
var deleteWorkspaceCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete current workspace",
	Args:  cobra.ArbitraryArgs,
	Run: func(cmd *cobra.Command, args []string) {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		wsInfo, err := gitpod.GetWSInfo(ctx)
		if err != nil {
			fail(err.Error())
		}
		client, err := gitpod.ConnectToServer(ctx, wsInfo, []string{
			"function:deleteWorkspace",
			"resource:workspace::" + wsInfo.WorkspaceId + "::get/update",
		})
		if err != nil {
			fail(err.Error())
		}
		err = client.DeleteWorkspace(ctx, wsInfo.WorkspaceId)
		if err != nil {
			fail(err.Error())
		}
	},
}

func init() {
	rootCmd.AddCommand(deleteWorkspaceCmd)
}

// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the MIT License. See License-MIT.txt in the project root for license information.

package cmd

import (
	"path/filepath"

	"github.com/gitpod-io/gitpod/common-go/log"
	"github.com/spf13/cobra"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

var configClusterOpts struct {
	Kube      kubeConfig
	Namespace string
}

// configClusterCmd represents the validate command
var configClusterCmd = &cobra.Command{
	Use:   "cluster",
	Short: "Perform configuration tasks against the cluster",
}

func init() {
	configCmd.AddCommand(configClusterCmd)

	configClusterCmd.Flags().StringVar(&configClusterOpts.Kube.Config, "kubeconfig", filepath.Join(homedir.HomeDir(), ".kube", "config"), "path to the kubeconfig file")
	configClusterCmd.Flags().StringVarP(&configClusterOpts.Namespace, "namespace", "n", getEnv("NAMESPACE", "default"), "namespace to deploy to")
}

func authClusterOrKubeconfig(kubeconfig string) (*rest.Config, error) {
	// Try authenticating in-cluster with serviceaccount
	log.Debug("Attempting to authenticate with ServiceAccount")
	config, err := rest.InClusterConfig()
	if err != nil {
		// Try authenticating out-of-cluster with kubeconfig
		log.Debug("ServiceAccount failed - using KubeConfig")
		config, err = clientcmd.BuildConfigFromFlags("", kubeconfig)
		if err != nil {
			return nil, err
		}
	}

	return config, nil
}

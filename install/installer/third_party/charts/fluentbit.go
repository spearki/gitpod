// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package charts

import (
	"embed"
)

// Imported from https://github.com/fluent/helm-charts

//go:embed fluent-bit/*
var fluentbit embed.FS

func Fluentbit() *Chart {
	return &Chart{
		Name:     "fluent-bit",
		Location: "fluent-bit/",
		Content:  &fluentbit,
	}
}

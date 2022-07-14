// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the MIT License. See License-MIT.txt in the project root for license information.

package common

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/mikefarah/yq/v4/pkg/yqlib"
	logging "gopkg.in/op/go-logging.v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type Processor struct {
	Type       metav1.TypeMeta
	Expression string
	// Processor func(*RuntimeObject) error
	Name *string // Optional
}

var Processors = []Processor{
	// Remove "status" from root of all network policies
	{
		Type:       TypeMetaNetworkPolicy,
		Expression: "del(.status)",
	},
}

// process emulates how YQ parsers the file
func process(expression string, obj *RuntimeObject) error {
	// Disable the logging to Stderr
	var format = logging.MustStringFormatter(
		`%{color}%{time:15:04:05} %{shortfunc} [%{level:.4s}]%{color:reset} %{message}`,
	)
	var backend = logging.AddModuleLevel(
		logging.NewBackendFormatter(logging.NewLogBackend(os.Stderr, "", 0), format))

	backend.SetLevel(logging.ERROR, "")
	logging.SetBackend(backend)
	// End of logger

	yqlib.InitExpressionParser()

	var writer bytes.Buffer
	printerWriter := yqlib.NewSinglePrinterWriter(&writer)
	encoder := yqlib.NewYamlEncoder(2, false, false, true)

	printer := yqlib.NewPrinter(encoder, printerWriter)

	decoder := yqlib.NewYamlDecoder()

	streamEvaluator := yqlib.NewStreamEvaluator()

	dir, err := os.MkdirTemp("", "post-processor")
	if err != nil {
		return err
	}
	file := fmt.Sprintf("%s/%s", dir, "content")
	err = ioutil.WriteFile(file, []byte(obj.Content), 0644)
	if err != nil {
		return err
	}

	err = streamEvaluator.EvaluateFiles(expression, []string{file}, printer, true, decoder)
	if err != nil {
		return err
	}

	obj.Content = writer.String()

	return nil
}

func useProcessor(object RuntimeObject, processor Processor) bool {
	if object.APIVersion == processor.Type.APIVersion && object.Kind == processor.Type.Kind {
		// Name is optional
		if processor.Name == nil {
			// Name not specified
			return true
		}

		return object.Metadata.Name == *processor.Name
	}

	return false
}

func PostProcess(objects []RuntimeObject) ([]RuntimeObject, error) {
	result := make([]RuntimeObject, 0)

	for _, o := range objects {
		for _, p := range Processors {
			if useProcessor(o, p) {
				err := process(p.Expression, &o)
				if err != nil {
					return nil, err
				}
			}
		}

		result = append(result, o)
	}

	return result, nil
}

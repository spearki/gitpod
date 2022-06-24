// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

package stripe

import (
	"bytes"
	// "encoding/json"

	"github.com/stretchr/testify/mock"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/form"
)

type backendMock struct {
	mock.Mock
}

func (s *backendMock) CallRaw(method, path, key string, body *form.Values, params *stripe.Params, v stripe.LastResponseSetter) error {
	switch path {
	case "/v1/customers/search":
		s.stubCustomerSearch(v.(*stripe.CustomerSearchResult))
	}
	args := s.Called(method, path, key, body, params, v)
	return args.Error(0)
}

func (s *backendMock) stubCustomerSearch(result *stripe.CustomerSearchResult) {
	customer := &stripe.Customer{
		Name:     "Alice",
		ID:       "cus_Lg4lCqlVshPGsN",
		Metadata: map[string]string{"teamId": "foobar"},
		Subscriptions: &stripe.SubscriptionList{
			Data: []*stripe.Subscription{{
				ID: "sub_1L0RdJGadRXm50o3YTGX9sc9",
				Items: &stripe.SubscriptionItemList{
					Data: []*stripe.SubscriptionItem{{
						ID:           "si_LhrMMcwl6HWFuH",
						Subscription: "sub_1L0RdJGadRXm50o3YTGX9sc9",
					}},
				},
			}},
		},
	}

	result.Data = append(result.Data, customer)
}

func (s *backendMock) Call(method, path, key string, params stripe.ParamsContainer, v stripe.LastResponseSetter) error {
	args := s.Called(method, path, key, params, v)
	return args.Error(0)
}

func (s *backendMock) CallStreaming(method, path, key string, params stripe.ParamsContainer, v stripe.StreamingLastResponseSetter) error {
	args := s.Called(method, path, key, params, v)
	return args.Error(0)
}

func (s *backendMock) CallMultipart(method, path, key, boundary string, body *bytes.Buffer, params *stripe.Params, v stripe.LastResponseSetter) error {
	args := s.Called(method, path, key, boundary, body, params, v)
	return args.Error(0)
}

func (s *backendMock) SetMaxNetworkRetries(maxNetworkRetries int64) {
	s.Called(maxNetworkRetries)
}

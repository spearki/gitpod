// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.20.1
// source: usage/v1/billing.proto

package v1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// BillingServiceClient is the client API for BillingService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type BillingServiceClient interface {
	UpdateInvoices(ctx context.Context, in *UpdateInvoicesRequest, opts ...grpc.CallOption) (*UpdateInvoicesResponse, error)
}

type billingServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewBillingServiceClient(cc grpc.ClientConnInterface) BillingServiceClient {
	return &billingServiceClient{cc}
}

func (c *billingServiceClient) UpdateInvoices(ctx context.Context, in *UpdateInvoicesRequest, opts ...grpc.CallOption) (*UpdateInvoicesResponse, error) {
	out := new(UpdateInvoicesResponse)
	err := c.cc.Invoke(ctx, "/usage.v1.BillingService/UpdateInvoices", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// BillingServiceServer is the server API for BillingService service.
// All implementations must embed UnimplementedBillingServiceServer
// for forward compatibility
type BillingServiceServer interface {
	UpdateInvoices(context.Context, *UpdateInvoicesRequest) (*UpdateInvoicesResponse, error)
	mustEmbedUnimplementedBillingServiceServer()
}

// UnimplementedBillingServiceServer must be embedded to have forward compatible implementations.
type UnimplementedBillingServiceServer struct {
}

func (UnimplementedBillingServiceServer) UpdateInvoices(context.Context, *UpdateInvoicesRequest) (*UpdateInvoicesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateInvoices not implemented")
}
func (UnimplementedBillingServiceServer) mustEmbedUnimplementedBillingServiceServer() {}

// UnsafeBillingServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to BillingServiceServer will
// result in compilation errors.
type UnsafeBillingServiceServer interface {
	mustEmbedUnimplementedBillingServiceServer()
}

func RegisterBillingServiceServer(s grpc.ServiceRegistrar, srv BillingServiceServer) {
	s.RegisterService(&BillingService_ServiceDesc, srv)
}

func _BillingService_UpdateInvoices_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateInvoicesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(BillingServiceServer).UpdateInvoices(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/usage.v1.BillingService/UpdateInvoices",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(BillingServiceServer).UpdateInvoices(ctx, req.(*UpdateInvoicesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// BillingService_ServiceDesc is the grpc.ServiceDesc for BillingService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var BillingService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "usage.v1.BillingService",
	HandlerType: (*BillingServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "UpdateInvoices",
			Handler:    _BillingService_UpdateInvoices_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "usage/v1/billing.proto",
}

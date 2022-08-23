/**
 * Copyright (c) 2022 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// package: contentservice
// file: usage.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as usage_pb from "./usage_pb";

interface IUsageReportServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    uploadURL: IUsageReportServiceService_IUploadURL;
    getDownloadURL: IUsageReportServiceService_IGetDownloadURL;
}

interface IUsageReportServiceService_IUploadURL extends grpc.MethodDefinition<usage_pb.UsageReportUploadURLRequest, usage_pb.UsageReportUploadURLResponse> {
    path: "/contentservice.UsageReportService/UploadURL";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<usage_pb.UsageReportUploadURLRequest>;
    requestDeserialize: grpc.deserialize<usage_pb.UsageReportUploadURLRequest>;
    responseSerialize: grpc.serialize<usage_pb.UsageReportUploadURLResponse>;
    responseDeserialize: grpc.deserialize<usage_pb.UsageReportUploadURLResponse>;
}
interface IUsageReportServiceService_IGetDownloadURL extends grpc.MethodDefinition<usage_pb.GetDownloadURLRequest, usage_pb.GetDownloadURLResponse> {
    path: "/contentservice.UsageReportService/GetDownloadURL";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<usage_pb.GetDownloadURLRequest>;
    requestDeserialize: grpc.deserialize<usage_pb.GetDownloadURLRequest>;
    responseSerialize: grpc.serialize<usage_pb.GetDownloadURLResponse>;
    responseDeserialize: grpc.deserialize<usage_pb.GetDownloadURLResponse>;
}

export const UsageReportServiceService: IUsageReportServiceService;

export interface IUsageReportServiceServer extends grpc.UntypedServiceImplementation {
    uploadURL: grpc.handleUnaryCall<usage_pb.UsageReportUploadURLRequest, usage_pb.UsageReportUploadURLResponse>;
    getDownloadURL: grpc.handleUnaryCall<usage_pb.GetDownloadURLRequest, usage_pb.GetDownloadURLResponse>;
}

export interface IUsageReportServiceClient {
    uploadURL(request: usage_pb.UsageReportUploadURLRequest, callback: (error: grpc.ServiceError | null, response: usage_pb.UsageReportUploadURLResponse) => void): grpc.ClientUnaryCall;
    uploadURL(request: usage_pb.UsageReportUploadURLRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: usage_pb.UsageReportUploadURLResponse) => void): grpc.ClientUnaryCall;
    uploadURL(request: usage_pb.UsageReportUploadURLRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: usage_pb.UsageReportUploadURLResponse) => void): grpc.ClientUnaryCall;
    getDownloadURL(request: usage_pb.GetDownloadURLRequest, callback: (error: grpc.ServiceError | null, response: usage_pb.GetDownloadURLResponse) => void): grpc.ClientUnaryCall;
    getDownloadURL(request: usage_pb.GetDownloadURLRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: usage_pb.GetDownloadURLResponse) => void): grpc.ClientUnaryCall;
    getDownloadURL(request: usage_pb.GetDownloadURLRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: usage_pb.GetDownloadURLResponse) => void): grpc.ClientUnaryCall;
}

export class UsageReportServiceClient extends grpc.Client implements IUsageReportServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public uploadURL(request: usage_pb.UsageReportUploadURLRequest, callback: (error: grpc.ServiceError | null, response: usage_pb.UsageReportUploadURLResponse) => void): grpc.ClientUnaryCall;
    public uploadURL(request: usage_pb.UsageReportUploadURLRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: usage_pb.UsageReportUploadURLResponse) => void): grpc.ClientUnaryCall;
    public uploadURL(request: usage_pb.UsageReportUploadURLRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: usage_pb.UsageReportUploadURLResponse) => void): grpc.ClientUnaryCall;
    public getDownloadURL(request: usage_pb.GetDownloadURLRequest, callback: (error: grpc.ServiceError | null, response: usage_pb.GetDownloadURLResponse) => void): grpc.ClientUnaryCall;
    public getDownloadURL(request: usage_pb.GetDownloadURLRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: usage_pb.GetDownloadURLResponse) => void): grpc.ClientUnaryCall;
    public getDownloadURL(request: usage_pb.GetDownloadURLRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: usage_pb.GetDownloadURLResponse) => void): grpc.ClientUnaryCall;
}

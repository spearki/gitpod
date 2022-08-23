// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) 2022 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var usage_pb = require('./usage_pb.js');

function serialize_contentservice_GetDownloadURLRequest(arg) {
  if (!(arg instanceof usage_pb.GetDownloadURLRequest)) {
    throw new Error('Expected argument of type contentservice.GetDownloadURLRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contentservice_GetDownloadURLRequest(buffer_arg) {
  return usage_pb.GetDownloadURLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_contentservice_GetDownloadURLResponse(arg) {
  if (!(arg instanceof usage_pb.GetDownloadURLResponse)) {
    throw new Error('Expected argument of type contentservice.GetDownloadURLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contentservice_GetDownloadURLResponse(buffer_arg) {
  return usage_pb.GetDownloadURLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_contentservice_UsageReportUploadURLRequest(arg) {
  if (!(arg instanceof usage_pb.UsageReportUploadURLRequest)) {
    throw new Error('Expected argument of type contentservice.UsageReportUploadURLRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contentservice_UsageReportUploadURLRequest(buffer_arg) {
  return usage_pb.UsageReportUploadURLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_contentservice_UsageReportUploadURLResponse(arg) {
  if (!(arg instanceof usage_pb.UsageReportUploadURLResponse)) {
    throw new Error('Expected argument of type contentservice.UsageReportUploadURLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contentservice_UsageReportUploadURLResponse(buffer_arg) {
  return usage_pb.UsageReportUploadURLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsageReportServiceService = exports.UsageReportServiceService = {
  // UploadURL provides a URL to which clients can upload the content via HTTP PUT.
uploadURL: {
    path: '/contentservice.UsageReportService/UploadURL',
    requestStream: false,
    responseStream: false,
    requestType: usage_pb.UsageReportUploadURLRequest,
    responseType: usage_pb.UsageReportUploadURLResponse,
    requestSerialize: serialize_contentservice_UsageReportUploadURLRequest,
    requestDeserialize: deserialize_contentservice_UsageReportUploadURLRequest,
    responseSerialize: serialize_contentservice_UsageReportUploadURLResponse,
    responseDeserialize: deserialize_contentservice_UsageReportUploadURLResponse,
  },
  // GetDownloadURL retrieves a URL which can be used to download a Usage Report.
getDownloadURL: {
    path: '/contentservice.UsageReportService/GetDownloadURL',
    requestStream: false,
    responseStream: false,
    requestType: usage_pb.GetDownloadURLRequest,
    responseType: usage_pb.GetDownloadURLResponse,
    requestSerialize: serialize_contentservice_GetDownloadURLRequest,
    requestDeserialize: deserialize_contentservice_GetDownloadURLRequest,
    responseSerialize: serialize_contentservice_GetDownloadURLResponse,
    responseDeserialize: deserialize_contentservice_GetDownloadURLResponse,
  },
};

exports.UsageReportServiceClient = grpc.makeGenericClientConstructor(UsageReportServiceService);

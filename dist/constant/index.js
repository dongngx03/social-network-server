"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasonStatusCode = exports.statusCode = void 0;
var statusCode;
(function (statusCode) {
    statusCode[statusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    statusCode[statusCode["CONFLICT"] = 409] = "CONFLICT";
    statusCode[statusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    statusCode[statusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    statusCode[statusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    statusCode[statusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    statusCode[statusCode["CREATED"] = 201] = "CREATED";
    statusCode[statusCode["OK"] = 200] = "OK";
})(statusCode || (exports.statusCode = statusCode = {}));
var ReasonStatusCode;
(function (ReasonStatusCode) {
    ReasonStatusCode["FORBIDDEN"] = "Invalid Request Error";
    ReasonStatusCode["CONFLICT"] = "Conflict Error";
    ReasonStatusCode["BAD_REQUEST"] = "Validation Error";
    ReasonStatusCode["NOT_FOUND"] = "Resource Not Found";
    ReasonStatusCode["UNAUTHORIZED"] = "Unauthorized Access";
    ReasonStatusCode["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    ReasonStatusCode["CREATED"] = "Created";
    ReasonStatusCode["OK"] = "Success";
})(ReasonStatusCode || (exports.ReasonStatusCode = ReasonStatusCode = {}));

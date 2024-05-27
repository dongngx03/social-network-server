"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseCustom = (success, message, data) => {
    return {
        success: success,
        message: message,
        data: data
    };
};
exports.default = responseCustom;

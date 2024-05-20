"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnMessage = void 0;
const returnMessage = (error) => {
    return {
        name: error.name,
        message: error.message
    };
};
exports.returnMessage = returnMessage;

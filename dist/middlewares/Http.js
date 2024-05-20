"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
class Http {
    static mount(_express) {
        console.log('Booting the HTTP middlware ...');
        // Disable the x-powered-by header in response
        _express.disable('x-powered-by');
        // morgan 
        _express.use((0, morgan_1.default)('dev'));
        // compresion
        _express.use((0, compression_1.default)());
        //delmet
        _express.use((0, helmet_1.default)());
        // express json
        _express.use(express_1.default.json());
        return _express;
    }
}
exports.default = Http;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locals_1 = __importDefault(require("../providers/Locals"));
const CORS_1 = __importDefault(require("./CORS"));
const Http_1 = __importDefault(require("./Http"));
const CsrfToken_1 = __importDefault(require("./CsrfToken"));
class Kernel {
    static init(_express) {
        // nếu cors dc đồng ý thiết lập 
        if (Locals_1.default.config().isCORSEnabled) {
            _express = CORS_1.default.mount(_express);
        }
        // Mount basic express apis middleware
        _express = Http_1.default.mount(_express);
        // Mount csrf token verification middleware
        _express = CsrfToken_1.default.mount(_express);
        return _express;
    }
}
exports.default = Kernel;

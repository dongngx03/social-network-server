"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lusca_1 = __importDefault(require("lusca"));
class CsrfToken {
    static mount(_express) {
        console.log('Booting CsrfToken middlware ...');
        _express.set('trust proxy', 1);
        // Enables x-frame-options headers
        _express.use(lusca_1.default.xframe('SAMEORIGIN'));
        // Enables xss-protection headers
        _express.use(lusca_1.default.xssProtection(true));
        return _express;
    }
}
exports.default = CsrfToken;

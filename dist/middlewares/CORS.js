"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const Locals_1 = __importDefault(require("../providers/Locals"));
class CORS {
    mount(_express) {
        console.log('start the CORS middlware... ');
        const options = {
            origin: Locals_1.default.config().url_client,
            optionsSuccessStatus: 200,
            credentials: true
        };
        _express.use((0, cors_1.default)(options));
        return _express;
    }
}
exports.default = new CORS;

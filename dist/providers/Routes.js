"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../routes"));
class Routes {
    mountWeb(_express) {
        console.log('Routes :: Mounting Web Routes...');
        _express.use('/', routes_1.default);
        return _express;
    }
}
exports.default = new Routes;

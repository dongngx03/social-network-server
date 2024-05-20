"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./Express"));
class App {
    loadServer() {
        console.log("server is running...");
        Express_1.default.init();
    }
}
exports.default = new App();

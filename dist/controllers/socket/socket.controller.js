"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaDb_1 = __importDefault(require("../../configs/prismaDb"));
const util_1 = require("../../util");
class SocketController {
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findSocketId = yield prismaDb_1.default.websoket.findUnique({
                    where: {
                        id: +req.params.id
                    }
                });
                if (!findSocketId)
                    return res.status(404).json({
                        success: false,
                        message: "can not find socketID"
                    });
                const deleteSocketId = yield prismaDb_1.default.websoket.delete({
                    where: {
                        id: +req.params.id
                    }
                });
                if (deleteSocketId)
                    return res.status(200).json({
                        success: true,
                        message: "delete successFully!"
                    });
                return res.status(400).json({
                    success: false,
                    message: "delete failed, please try again !!!"
                });
            }
            catch (error) {
                return res.status(500).json((0, util_1.returnMessage)(error));
            }
        });
    }
}
exports.default = SocketController;

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
class GoogleController {
    static logout(req, res) {
        req.logout((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            return res.status(200).json({
                success: true,
                message: "logout successFully!"
            });
        });
    }
    static loginSuccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const user = yield prismaDb_1.default.user.findUnique({
                    where: {
                        idAuth: req.user.id
                    }
                });
                return res.json({
                    success: true,
                    message: "User Authenticated",
                    user: user
                });
            }
            else
                return res.status(400).json({
                    success: false,
                    message: "User Not Authenticated",
                    user: null
                });
        });
    }
    static loginFailed(req, res) {
        return res.status(401).json({
            success: false,
            message: "failed"
        });
    }
}
exports.default = GoogleController;

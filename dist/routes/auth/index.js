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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const Locals_1 = __importDefault(require("../../providers/Locals"));
const google_controller_1 = __importDefault(require("../../controllers/auth/google.controller"));
const prismaDb_1 = __importDefault(require("../../configs/prismaDb"));
const routerAuth = (0, express_1.Router)();
routerAuth.get('/login/failed', google_controller_1.default.loginFailed);
routerAuth.get('/login/success', google_controller_1.default.loginSuccess);
routerAuth.get('/logout', google_controller_1.default.logout);
routerAuth.get('/google', passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
routerAuth.get('/google/callback', passport_1.default.authenticate("google", {
    successRedirect: Locals_1.default.config().url_client,
    failureRedirect: "/v1/api/auth/login/failed"
}));
// test router
routerAuth.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaDb_1.default.user.findMany();
    return res.status(200).json({
        success: true,
        user: user
    });
}));
exports.default = routerAuth;

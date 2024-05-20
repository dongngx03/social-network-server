"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
const socket_1 = __importDefault(require("./socket"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default); // auth
router.use('/v1/api/user', user_1.default); // user
router.use('/v1/api/post', post_1.default); // post
router.use('/v1/api/socket', socket_1.default); // socket
exports.default = router;

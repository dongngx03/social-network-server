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
const message_1 = __importDefault(require("./message"));
const comment_1 = __importDefault(require("./comment"));
const following_1 = __importDefault(require("./following"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default); // auth google
router.use('/v1/api/user', user_1.default); // user
router.use('/v1/api/post', post_1.default); // post
router.use('/v1/api/socket', socket_1.default); // socket
router.use('/v1/api/message', message_1.default); // message
router.use('/v1/api/comment', comment_1.default); // comment
router.use('/v1/api/following', following_1.default); // following
exports.default = router;

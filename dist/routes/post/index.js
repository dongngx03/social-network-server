"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../../controllers/post/post.controller"));
const postRouter = (0, express_1.Router)();
postRouter.post('/', post_controller_1.default.create);
postRouter.get('/detail/:id', post_controller_1.default.getDetail);
postRouter.delete('/:id', post_controller_1.default.deletePost);
postRouter.get('/get-post-one-user/:id', post_controller_1.default.getAllPostOneUser);
exports.default = postRouter;

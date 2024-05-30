"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../../controllers/post/post.controller"));
const postRouter = (0, express_1.Router)();
// tạo bài post
postRouter.post('/', post_controller_1.default.create);
// chi tiết bài post
postRouter.get('/detail/:id', post_controller_1.default.getDetail);
// xóa bài post
postRouter.delete('/:id', post_controller_1.default.deletePost);
// lấy tất cả bài post của 1 người 
postRouter.get('/get-post-one-user/:id', post_controller_1.default.getAllPostOneUser);
exports.default = postRouter;

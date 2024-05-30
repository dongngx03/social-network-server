"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../../controllers/comment/comment.controller"));
const route = (0, express_1.Router)();
// comment
route.post("/", comment_controller_1.default.create);
// xóa comment
route.delete("/:id", comment_controller_1.default.delete);
// chỉnh sửa comment
route.put("/:id", comment_controller_1.default.update);
// lấy tất cả comment của lớp cha 
route.get("/:id", comment_controller_1.default.getAllCommentFromPost);
// lấy comment con theo cha 
route.get("/get-children-comment/:id/:parent_id", comment_controller_1.default.getAllCommentChildrenFromParent);
exports.default = route;

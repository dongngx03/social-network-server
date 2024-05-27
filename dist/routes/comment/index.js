"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../../controllers/comment/comment.controller"));
const route = (0, express_1.Router)();
route.post("/", comment_controller_1.default.create);
route.delete("/:id", comment_controller_1.default.delete);
route.put("/:id", comment_controller_1.default.update);
route.get("/:id", comment_controller_1.default.getAllCommentFromPost);
route.get("/get-children-comment/:id/:parent_id", comment_controller_1.default.getAllCommentChildrenFromParent);
exports.default = route;

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
const prismaDb_1 = __importDefault(require("../configs/prismaDb"));
class CommentService {
    static create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ post_id, source_id, comment_content, parent_comment_id }) {
            const newComment = yield prismaDb_1.default.comment.create({
                data: {
                    postId: post_id,
                    sourceId: source_id,
                    commentContent: comment_content,
                    parentCommentId: parent_comment_id ? parent_comment_id : 0
                }
            });
            return newComment;
        });
    }
    static delete(comment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const delC = yield prismaDb_1.default.comment.delete({
                where: {
                    id: +comment_id
                }
            });
            return delC;
        });
    }
    static update(comment_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateC = yield prismaDb_1.default.comment.update({
                where: { id: +comment_id },
                data: body
            });
            return updateC;
        });
    }
    static getAllCommentParentFromOnePost(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allC = yield prismaDb_1.default.comment.findMany({
                where: {
                    AND: [
                        { postId: +post_id },
                        { parentCommentId: 0 }
                    ]
                },
                include: {
                    comments: true
                }
            });
            return allC;
        });
    }
    static getAllCommentChildrenFromParent(post_id, parent_comment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allC = yield prismaDb_1.default.comment.findMany({
                where: {
                    AND: [
                        { parentCommentId: +parent_comment_id }
                    ]
                }
            });
            return allC;
        });
    }
}
exports.default = CommentService;

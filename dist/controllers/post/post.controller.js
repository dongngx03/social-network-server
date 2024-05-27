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
const util_1 = require("../../util");
const prismaDb_1 = __importDefault(require("../../configs/prismaDb"));
class PostController {
    //create post
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // bài viết không có ảnh 
                if (req.body.imageUrl.length === 0) {
                    const newPost = yield prismaDb_1.default.post.create({
                        data: {
                            sourceId: req.body.sourceId,
                            postContent: req.body.postContent,
                        }
                    });
                    return res.status(201).json({
                        success: true,
                        message: "Tạo bài viết thành công, bài viết này khôn có ảnh",
                        post: newPost
                    });
                }
                // bài viết có ảnh 
                const newPost1 = yield prismaDb_1.default.post.create({
                    data: {
                        sourceId: req.body.sourceId,
                        postContent: req.body.postContent,
                    }
                });
                // tạo mảng ảnh 
                const records = req.body.imageUrl.map((e) => {
                    return {
                        imageUrl: e,
                        postId: newPost1.id
                    };
                });
                // them ảnh vào bài post
                const addImageInPost = yield prismaDb_1.default.image_post.createMany({
                    data: records
                });
                if (addImageInPost) {
                    return res.status(201).json({
                        success: true,
                        message: "Thêm bài viết thành công"
                    });
                }
            }
            catch (error) {
                return res.status(500).json((0, util_1.returnMessage)(error));
            }
        });
    }
    // get post detail 
    static getDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // lấy chi tiết 
                const post = yield prismaDb_1.default.post.findUnique({
                    where: {
                        id: +req.params.id
                    },
                    include: {
                        user: true,
                        images: true,
                        likes: true,
                        comments: true
                    }
                });
                return res.status(200).json({
                    success: true,
                    message: "lấy bài viết thành công",
                    post: post
                });
            }
            catch (error) {
                return res.status(500).json((0, util_1.returnMessage)(error));
            }
        });
    }
    // delte post by id (test)
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // xóa post
                yield prismaDb_1.default.post.delete({
                    where: {
                        id: +req.params.id
                    }
                });
                // xóa các ảnh của bài viết nếu có 
                yield prismaDb_1.default.image_post.deleteMany({
                    where: {
                        postId: +req.params.id
                    }
                });
                return res.status(200).json({
                    message: "xóa thành công"
                });
            }
            catch (error) {
                return res.status(500).json((0, util_1.returnMessage)(error));
            }
        });
    }
    // get all post from one user 
    static getAllPostOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allPost = yield prismaDb_1.default.post.findMany({
                    where: {
                        sourceId: +req.params.id
                    },
                    include: {
                        images: true
                    }
                });
                const countPost = yield prismaDb_1.default.post.count({
                    where: {
                        sourceId: +req.params.id
                    }
                });
                return res.status(200).json({
                    success: true,
                    message: "Lấy bài viết thành công",
                    data: allPost,
                    count: countPost
                });
            }
            catch (error) {
                return res.status(500).json((0, util_1.returnMessage)(error));
            }
        });
    }
}
exports.default = PostController;

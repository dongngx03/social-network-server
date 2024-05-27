import Joi from "joi";
import IRequest from "../../interfaces/vendors/IRequest";
import IResponse from "../../interfaces/vendors/IResponse";
import { returnMessage } from "../../util";
import prismaDb from "../../configs/prismaDb";


class PostController {
    //create post
    public static async create(req: IRequest, res: IResponse) {
        try {
            // bài viết không có ảnh 
            if (req.body.imageUrl.length === 0) {
                const newPost = await prismaDb.post.create({
                    data: {
                        sourceId: req.body.sourceId,
                        postContent: req.body.postContent,
                    }
                })

                return res.status(201).json({
                    success: true,
                    message: "Tạo bài viết thành công, bài viết này khôn có ảnh",
                    post: newPost
                })
            }
            // bài viết có ảnh 
            const newPost1 = await prismaDb.post.create({
                data: {
                    sourceId: req.body.sourceId,
                    postContent: req.body.postContent,
                }
            })

            // tạo mảng ảnh 
            const records = req.body.imageUrl.map((e: any) => {
                return {
                    imageUrl: e,
                    postId: newPost1.id
                }
            })

            // them ảnh vào bài post
            const addImageInPost = await prismaDb.image_post.createMany({
                data: records
            })

            if (addImageInPost) {
                return res.status(201).json({
                    success: true,
                    message: "Thêm bài viết thành công"
                })
            }


        } catch (error) {
            return res.status(500).json(returnMessage(error))
        }
    }
    // get post detail 
    public static async getDetail(req: IRequest, res: IResponse) {
        try {
            // lấy chi tiết 
            const post = await prismaDb.post.findUnique({
                where: {
                    id: +req.params.id
                },
                include: {
                    user: true,
                    images: true,
                    likes: true,
                    comments: true
                }
            })

            return res.status(200).json({
                success: true,
                message: "lấy bài viết thành công",
                post: post
            })
        } catch (error) {
            return res.status(500).json(returnMessage(error))
        }
    }
    // delte post by id (test)
    public static async deletePost(req: IRequest, res: IResponse) {
        try {
            // xóa post
            await prismaDb.post.delete({
                where: {
                    id: +req.params.id
                }
            })

            // xóa các ảnh của bài viết nếu có 
            await prismaDb.image_post.deleteMany({
                where: {
                    postId: +req.params.id
                }
            })

            return res.status(200).json({
                message: "xóa thành công"
            })
        } catch (error) {
            return res.status(500).json(returnMessage(error))
        }
    }

    // get all post from one user 
    public static async getAllPostOneUser(req: IRequest, res: IResponse) {
        try {
            const allPost = await prismaDb.post.findMany({
                where: {
                    sourceId: +req.params.id
                },
                include: {
                    images: true
                }
            })

            const countPost = await prismaDb.post.count({
                where: {
                    sourceId: +req.params.id
                }
            })

            return res.status(200).json({
                success: true,
                message: "Lấy bài viết thành công",
                data: allPost,
                count: countPost
            })

        } catch (error) {
            return res.status(500).json(returnMessage(error))
        }
    }

}

export default PostController
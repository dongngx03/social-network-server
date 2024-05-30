import { Router } from "express";
import PostController from "../../controllers/post/post.controller";

const postRouter = Router()

// tạo bài post
postRouter.post('/', PostController.create as any)
// chi tiết bài post
postRouter.get('/detail/:id', PostController.getDetail as any)
// xóa bài post
postRouter.delete('/:id', PostController.deletePost as any)
// lấy tất cả bài post của 1 người 
postRouter.get('/get-post-one-user/:id', PostController.getAllPostOneUser as any)

export default postRouter
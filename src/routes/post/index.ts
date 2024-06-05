import { Router } from "express";
import PostController from "../../controllers/post/post.controller";
import CheckMember from "../../middlewares/CheckMember";

const postRouter = Router()

// tạo bài post
postRouter.post('/', CheckMember.isUser, PostController.create)
// chi tiết bài post
postRouter.get('/detail/:id', CheckMember.isUser, PostController.getDetail)
// xóa bài post
postRouter.delete('/:id', CheckMember.isUser, PostController.deletePost)
// lấy tất cả bài post của 1 người 
postRouter.get('/get-post-one-user/:id', CheckMember.isUser, PostController.getAllPostOneUser)

export default postRouter
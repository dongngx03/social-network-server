import { Router } from "express";
import PostController from "../../controllers/post/post.controller";

const postRouter = Router()

postRouter.post('/', PostController.create as any)
postRouter.get('/detail/:id', PostController.getDetail as any)
postRouter.delete('/:id', PostController.deletePost as any)
postRouter.get('/get-post-one-user/:id', PostController.getAllPostOneUser as any)

export default postRouter
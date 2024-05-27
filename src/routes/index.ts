import { Router } from "express";
import routerAuth from "./auth";
import userRouter from "./user";
import postRouter from "./post";
import socketRouter from "./socket";
import messageRouter from "./message"
import commentRouter from "./comment"

const router = Router();

router.use('/auth', routerAuth) // auth
router.use('/v1/api/user', userRouter) // user
router.use('/v1/api/post', postRouter) // post
router.use('/v1/api/socket', socketRouter) // socket
router.use('/v1/api/message', messageRouter)
router.use('/v1/api/comment', commentRouter)

export default router
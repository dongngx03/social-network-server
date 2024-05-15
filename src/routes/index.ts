import { Router } from "express";
import routerAuth from "./auth";
import userRouter from "./user";
import postRouter from "./post";

const router = Router();

router.use('/auth', routerAuth) // auth
router.use('/v1/api/user', userRouter) // user
router.use('/v1/api/post', postRouter) // post

export default router
import { Router } from "express";
import routerAuth from "./auth";
import userRouter from "./user";

const router = Router();

router.use('/auth', routerAuth)
router.use('/v1/api/user', userRouter)

export default router
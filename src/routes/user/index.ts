import { Router } from "express";
import UserController from "../../controllers/user/user.controller";
import CheckMember from "../../middlewares/CheckMember";

const userRouter = Router();

userRouter.get('/:id', CheckMember.isUser as any, UserController.getInfor as any)

export default userRouter
import { Router } from "express";
import UserController from "../../controllers/user/user.controller";
import CheckMember from "../../middlewares/CheckMember";

const userRouter = Router();

userRouter.get('/:id', CheckMember.isUser as any, UserController.getInfor as any)
userRouter.put('/:id', CheckMember.isUser as any, UserController.updateInfor as any)
userRouter.post('/search', CheckMember.isUser as any, UserController.searchUser as any)
userRouter.post('/detail', UserController.UserDetail as any)
userRouter.put('/update-avatar/:id', CheckMember.isUser as any, UserController.updateAvatar as any)


export default userRouter
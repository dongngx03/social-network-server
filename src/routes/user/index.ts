import { Router } from "express";
import UserController from "../../controllers/user/user.controller";
import CheckMember from "../../middlewares/CheckMember";

const userRouter = Router();

userRouter.get('/:id', CheckMember.isUser, UserController.getInfor)
userRouter.put('/:id', CheckMember.isUser, UserController.updateInfor)
userRouter.post('/search', CheckMember.isUser, UserController.searchUser)
userRouter.post('/detail', UserController.userDetail) 
userRouter.put('/update-avatar/:id', CheckMember.isUser, UserController.updateAvatar)


export default userRouter
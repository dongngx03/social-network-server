"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user/user.controller"));
const CheckMember_1 = __importDefault(require("../../middlewares/CheckMember"));
const userRouter = (0, express_1.Router)();
userRouter.get('/:id', CheckMember_1.default.isUser, user_controller_1.default.getInfor);
userRouter.put('/:id', CheckMember_1.default.isUser, user_controller_1.default.updateInfor);
userRouter.post('/search', CheckMember_1.default.isUser, user_controller_1.default.searchUser);
userRouter.post('/detail', user_controller_1.default.userDetail);
userRouter.put('/update-avatar/:id', CheckMember_1.default.isUser, user_controller_1.default.updateAvatar);
exports.default = userRouter;

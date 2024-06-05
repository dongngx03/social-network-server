import { Router } from "express";
import NotifycationController from "../../controllers/notifycation/notifycation.controller";
import CheckMember from "../../middlewares/CheckMember";

const router = Router();

router.get('/:user_id', CheckMember.isUser, NotifycationController.getAllNotifycations)

export default router
import { Router } from "express";
import MessageController from "../../controllers/message/message.controller";

const router = Router()

router.post('/', MessageController.sendMessage) // send message 
router.delete('/:id', MessageController.deleteMessage)
router.post('/get-all-box-chat', MessageController.getAllMessageFromBoxChat)

export default router
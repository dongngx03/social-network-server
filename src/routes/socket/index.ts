import { Router } from "express";
import SocketController from "../../controllers/socket/socket.controller";

const socketRouter = Router()

socketRouter.delete('/:id', SocketController.delete as () => any)

export default socketRouter
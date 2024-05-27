import { statusCode } from "../../constant";
import responseCustom from "../../core/response";
import IRequest from "../../interfaces/vendors/IRequest";
import IResponse from "../../interfaces/vendors/IResponse";
import MessageService from "../../services/message.service";
import { returnMessage } from "../../util";

class MessageController {
    // gửi tin nhắn 
    static async sendMessage(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const sendMess = await MessageService.sendMessage(req.body)
            return res.status(statusCode.CREATED).json(responseCustom(
                true,
                "send message successFully!",
                sendMess
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    // xóa tin nhắn 
    static async deleteMessage(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const deleteMess = await MessageService.deleteMessage(req.params.id)
            if (!deleteMess) return res.status(statusCode.NOT_FOUND).json(responseCustom(
                false,
                ` message id ${req.params.id} doesn't exist !`,
                deleteMess
            ))
            return res.status(statusCode.OK).json(responseCustom(
                true,
                `delete message id ${req.params.id} successFully!`,
                deleteMess
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    // lấy hết tin nhắn của 1 người với 1 người 
    static async getAllMessageFromBoxChat(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const allMessage = await MessageService.getAllMessageBoxChat(req.body.sender_id, req.body.receiver_id)
            return res.status(statusCode.OK).json(responseCustom(
                true,
                "get all message successFully !",
                allMessage
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }



}

export default MessageController
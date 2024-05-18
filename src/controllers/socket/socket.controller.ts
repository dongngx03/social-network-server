import prismaDb from "../../configs/prismaDb";
import IRequest from "../../interfaces/vendors/IRequest";
import IResponse from "../../interfaces/vendors/IResponse";
import { returnMessage } from "../../util";


class SocketController {
    public static async delete(req: IRequest, res: IResponse) {
        try {
            const findSocketId = await prismaDb.websoket.findUnique({
                where: {
                    id: +req.params.id
                }
            })

            if (!findSocketId) return res.status(404).json({
                success: false,
                message: "can not find socketID"
            })

            const deleteSocketId = await prismaDb.websoket.delete({
                where: {
                    id: +req.params.id
                }
            })

            if (deleteSocketId) return res.status(200).json({
                success: true,
                message: "delete successFully!"
            })

            return res.status(400).json({
                success: false,
                message: "delete failed, please try again !!!"
            })
        } catch (error) {
            return res.status(500).json(returnMessage(error))
        }
    }
}

export default SocketController
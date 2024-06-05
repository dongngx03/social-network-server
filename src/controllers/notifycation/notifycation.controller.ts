import { statusCode } from "../../constant";
import responseCustom from "../../core/response";
import IRequest from "../../interfaces/vendors/IRequest";
import IResponse from "../../interfaces/vendors/IResponse";
import NotifycationService from "../../services/notifycation.service";
import { returnMessage } from "../../util";

class NotifycationController {
    static async getAllNotifycations(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const notifycations = await NotifycationService.getAllNotifycation(req.params.id);
            return res.status(statusCode.OK).json(responseCustom(
                true,
                "get notifycations successfully!",
                notifycations
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }
}

export default NotifycationController
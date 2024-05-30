import { statusCode } from "../../constant"
import responseCustom from "../../core/response"
import IRequest from "../../interfaces/vendors/IRequest"
import IResponse from "../../interfaces/vendors/IResponse"
import FollowingService from "../../services/following.service"
import { returnMessage } from "../../util"

class FollowingController {
    static async create(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const following = await FollowingService.create(req.body.source_id, req.body.target_id)
            if (following) return res.status(statusCode.CREATED).json(responseCustom(
                true,
                `Followed user id:${req.body.target_id} successfully`,
                following
            ))

            return res.status(statusCode.CONFLICT).json(responseCustom(
                false,
                "this user was followed !!",
                following
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    static async unFollow(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const unF = await FollowingService.unFollow(req.body.source_id, req.body.target_id)
            if (!unF) return res.status(statusCode.CONFLICT).json(responseCustom(
                false,
                "this user is not follow",
                unF
            ))

            return res.status(statusCode.OK).json(responseCustom(
                true,
                "UnFollow successFully !",
                unF
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    // get user follow me 
    static async getUsersFollowMe(req: IRequest | any, res: IResponse) {
        try {
            const data = await FollowingService.getAllPeopleFollowingMe(req.params.target_id)
            return res.status(statusCode.OK).json(responseCustom(
                true,
                "get all users follow me successfully ! ",
                data
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    static async getUsersFollowing(req: IRequest | any, res: IResponse) {
        try {
            const data = await FollowingService.getAllPeopleFollowing(req.params.source_id)
            return res.status(statusCode.OK).json(responseCustom(
                true,
                "get all users following successfully ! ",
                data
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }
}

export default FollowingController
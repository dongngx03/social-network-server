import { statusCode } from "../../constant";
import responseCustom from "../../core/response";
import IRequest from "../../interfaces/vendors/IRequest";
import IResponse from "../../interfaces/vendors/IResponse";
import CommentService from "../../services/comment.service";
import { returnMessage } from "../../util";

class CommentController {
    static async create(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const newComment = await CommentService.create(req.body)
            return res.status(statusCode.CREATED).json(responseCustom(
                true,
                "create new comment successFully !",
                newComment
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    static async delete(req: IRequest | any, res: IResponse): Promise<any> {
        try {
            const del = await CommentService.delete(req.params.id)

            return res.status(statusCode.OK).json(responseCustom(
                true,
                `delete comemnt id : ${req.params.id} successFully !`,
                del
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    static async update(req: IRequest | any, res: IResponse) {
        try {
            const upd = await CommentService.update(req.params.id, req.body)
            return res.status(statusCode.OK).json(responseCustom(
                true,
                `update comment id : ${req.params.id} successFully!`,
                upd
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    static async getAllCommentFromPost(req: IRequest | any, res: IResponse) {
        try {
            const allC = await CommentService.getAllCommentParentFromOnePost(req.params.id)
            return res.status(statusCode.OK).json(responseCustom(
                true,
                "get all comment successFully !",
                allC
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }

    static async getAllCommentChildrenFromParent(req: IRequest | any, res: IResponse) {
        try {
            const allC = await CommentService.getAllCommentChildrenFromParent(req.param.id, req.params.parent_id)
            return res.status(statusCode.OK).json(responseCustom(
                true,
                `get all comment children of parent id : ${req.query.parent_comment_id} successFully!`,
                allC
            ))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(returnMessage(error))
        }
    }
}

export default CommentController
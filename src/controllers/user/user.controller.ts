import prismaDb from "../../configs/prismaDb";
import IRequest from "../../interfaces/vendors/IRequest";
import IResponse from "../../interfaces/vendors/IResponse";

class UserController {
    // get user infor 
    public static async getInfor(req: IRequest, res: IResponse): Promise<IResponse> {
        try {
            const userInfor = await prismaDb.user.findUnique({
                where: {
                    idAuth: req.params.id
                }
            })

            return res.status(200).json({
                success: true,
                data: userInfor
            })
        } catch (error: any) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }
}

export default UserController
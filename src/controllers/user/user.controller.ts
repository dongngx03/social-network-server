import Joi from "joi";
import prismaDb from "../../configs/prismaDb";
import IRequest from "../../interfaces/vendors/IRequest";
import IResponse from "../../interfaces/vendors/IResponse";

const updateUserValid = Joi.object({
    idAuth: Joi.string().required(),
    fistname: Joi.string().empty(),
    lastname: Joi.string().empty(),
    phone: Joi.string().empty().allow(""),
    email: Joi.string().email().required(),
    birtday: Joi.string().required(),
    nickname: Joi.string().required(),
    gender: Joi.string().required(),
    avatar: Joi.string().required(),
    imagebackground: Joi.string().empty().allow("")
})

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
    // update user infor 
    public static async updateInfor(req: IRequest, res: IResponse) {
        try {
            //valid
            const { error } = updateUserValid.validate(req.body, { abortEarly: false })
            if (error) {
                const errors = error.details.map(e => e.message)
                return res.status(400).json({
                    success: false,
                    error: errors
                })
            }

            // check người dùng 
            const user = await prismaDb.user.findUnique({
                where: {
                    id: +req.params.id
                }
            })

            if (!user) return res.status(404).json({
                success: false,
                message: "can not find user"
            })

            // check trùng nickname 
            const checkNickName = await prismaDb.user.findUnique({
                where: {
                    nickname: req.body.nickname
                }
            })

            if (checkNickName && user.nickname != checkNickName.nickname) {
                return res.status(400).json({
                    success: false,
                    message: "Biệt danh đã có người dùng , vui lòng thử biệt danh khác"
                })
            }

            // thay đổi thông tin người dùng 
            const changeInforUser = await prismaDb.user.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    ...req.body,
                    birtday: new Date(req.body.birtday)
                }
            })

            return res.status(200).json({
                success: true,
                message: "Thay đổi thông tin thành công !",
                newUser: changeInforUser
            })

        } catch (error: any) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }
    // search user 
    public static async searchUser(req: IRequest, res: IResponse) {
        try {
            const user = await prismaDb.user.findMany({
                where: {
                    nickname: {
                        contains: req.body.nickname
                    }
                }
            })

            const UserSearch = user.filter((e: any) => e.nickname !== req.body.userNickname)

            return res.status(200).json({
                success: true,
                message: "search user successfully!",
                data: UserSearch
            })
        } catch (error: any) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }
    // user detail 
    public static async UserDetail(req: IRequest, res: IResponse) {
        try {
            // get user detail 
            const user = await prismaDb.user.findUnique({
                where: {
                    nickname: req.body.nickname
                }
            })

            // lấy tất cả bài viết của người ấy 
            const allPost = await prismaDb.post.findMany({
                where : {
                    sourceId : user?.id
                },
                include : {
                    images : true
                }
            })

            // đếm bài viết 
            const countPost = await prismaDb.post.count({
                where: {
                    sourceId: user?.id
                }
            })

            if (user) {
                return res.status(200).json({
                    success: true,
                    message: "get user successfully ",
                    data: user,
                    coutPost: countPost,
                    allPost: allPost
                })
            }

            return res.status(404).json({
                success: false,
                message: "can not find user"
            })
        } catch (error: any) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }
    // update avatar 
    public static async updateAvatar(req: IRequest, res: IResponse) {
        try {
            const newAvatar = await prismaDb.user.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    avatar: req.body.avatar
                }
            })

            if (!newAvatar) return res.status(400).json({
                success: false,
                message: "có chút lỗi , vui lòng thử lại"
            })

            return res.status(200).json({
                success: true,
                message: "Thay đổi ảnh đại diện thành công"
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
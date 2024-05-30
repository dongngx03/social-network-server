import prismaDb from "../../configs/prismaDb";
import IRequest from "../../interfaces/vendors/IRequest"
import IResponse from "../../interfaces/vendors/IResponse"

class GoogleController {

    public static logout(req: IRequest, res: IResponse) {
        req.logout((err: any) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            return res.status(200).json({
                success: true,
                message: "logout successFully!"
            })
        });
    }

    public static async loginSuccess(req: IRequest, res: IResponse) {
        if (req.user) {
            const user = await prismaDb.user.findUnique({
                where: {
                    idAuth: req.user.id
                },
                include: {
                    _count: {
                        select: {
                            following_1: true,
                            following_2: true
                        }
                    },
                    following_1: {
                        select: {
                            reciever: {
                                select: {
                                    id: true,
                                    nickname: true,
                                    avatar: true,
                                    _count: {
                                        select: {
                                            following_1: true,
                                            following_2: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    following_2: {
                        select: {
                            sender: {
                                select: {
                                    id: true,
                                    nickname: true,
                                    avatar: true,
                                    _count: {
                                        select: {
                                            following_1: true,
                                            following_2: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            return res.json({
                success: true,
                message: "User Authenticated",
                user: user
            })
        }
        else return res.status(400).json({
            success: false,
            message: "User Not Authenticated",
            user: null
        })
    }

    public static loginFailed(req: IRequest, res: IResponse) {
        return res.status(401).json({
            success: false,
            message: "failed"
        })
    }
}

export default GoogleController
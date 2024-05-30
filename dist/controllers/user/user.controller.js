"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const prismaDb_1 = __importDefault(require("../../configs/prismaDb"));
const updateUserValid = joi_1.default.object({
    idAuth: joi_1.default.string().required(),
    fistname: joi_1.default.string().empty(),
    lastname: joi_1.default.string().empty(),
    phone: joi_1.default.string().empty().allow(""),
    email: joi_1.default.string().email().required(),
    birtday: joi_1.default.string().required(),
    nickname: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    avatar: joi_1.default.string().required(),
    imagebackground: joi_1.default.string().empty().allow("")
});
class UserController {
    // get user infor 
    static getInfor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfor = yield prismaDb_1.default.user.findUnique({
                    where: {
                        idAuth: req.params.id
                    }
                });
                return res.status(200).json({
                    success: true,
                    data: userInfor
                });
            }
            catch (error) {
                return res.status(500).json({
                    name: error.name,
                    message: error.message
                });
            }
        });
    }
    // update user infor 
    static updateInfor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //valid
                const { error } = updateUserValid.validate(req.body, { abortEarly: false });
                if (error) {
                    const errors = error.details.map(e => e.message);
                    return res.status(400).json({
                        success: false,
                        error: errors
                    });
                }
                // check người dùng 
                const user = yield prismaDb_1.default.user.findUnique({
                    where: {
                        id: +req.params.id
                    }
                });
                if (!user)
                    return res.status(404).json({
                        success: false,
                        message: "can not find user"
                    });
                // check trùng nickname 
                const checkNickName = yield prismaDb_1.default.user.findUnique({
                    where: {
                        nickname: req.body.nickname
                    }
                });
                if (checkNickName && user.nickname != checkNickName.nickname) {
                    return res.status(400).json({
                        success: false,
                        message: "Biệt danh đã có người dùng , vui lòng thử biệt danh khác"
                    });
                }
                // thay đổi thông tin người dùng 
                const changeInforUser = yield prismaDb_1.default.user.update({
                    where: {
                        id: +req.params.id
                    },
                    data: Object.assign(Object.assign({}, req.body), { birtday: new Date(req.body.birtday) })
                });
                return res.status(200).json({
                    success: true,
                    message: "Thay đổi thông tin thành công !",
                    newUser: changeInforUser
                });
            }
            catch (error) {
                return res.status(500).json({
                    name: error.name,
                    message: error.message
                });
            }
        });
    }
    // search user 
    static searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prismaDb_1.default.user.findMany({
                    where: {
                        nickname: {
                            contains: req.body.nickname
                        }
                    }
                });
                const UserSearch = user.filter((e) => e.nickname !== req.body.userNickname);
                return res.status(200).json({
                    success: true,
                    message: "search user successfully!",
                    data: UserSearch
                });
            }
            catch (error) {
                return res.status(500).json({
                    name: error.name,
                    message: error.message
                });
            }
        });
    }
    // user detail 
    static userDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check redis exist data 
                // const checkRedis = await RedisService.getPromise(`userDetail-${req.body.nickname}`)
                // if (checkRedis) {
                //     return res.status(200).json(JSON.parse(checkRedis))
                // }
                // console.log('data does not exist on redis!!');
                // get user detail 
                const user = yield prismaDb_1.default.user.findUnique({
                    where: {
                        nickname: req.body.nickname
                    },
                    include: {
                        // đếm người theo dõi , người đang theo dõi 
                        _count: {
                            select: {
                                following_1: true, // người mình đang theo dõi
                                following_2: true, // người theo dõi mình 
                                posts: true // post
                            },
                        },
                        // những người đang theo dõi
                        following_1: {
                            select: {
                                targetId: true,
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
                                        },
                                    }
                                }
                            }
                        },
                        // những người theo dõi
                        following_2: {
                            select: {
                                sourceId: true,
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
                });
                // lấy tất cả bài viết của người ấy 
                const allPost = yield prismaDb_1.default.post.findMany({
                    where: {
                        sourceId: user === null || user === void 0 ? void 0 : user.id
                    },
                    include: {
                        images: true
                    }
                });
                // đếm bài viết 
                const countPost = yield prismaDb_1.default.post.count({
                    where: {
                        sourceId: user === null || user === void 0 ? void 0 : user.id
                    }
                });
                // check xem người tìm có theo dõi người này không 
                const checkFollow = yield prismaDb_1.default.following.findMany({
                    where: {
                        sourceId: +req.body.source_id,
                        targetId: +user.id
                    }
                });
                if (user) {
                    // const setRedis = await RedisService.setPromise(`userDetail-${req.body.nickname}`, JSON.stringify({
                    //     success: true,
                    //     message: "get user successfully --> from redis ",
                    //     data: user,
                    //     coutPost: countPost,
                    //     allPost: allPost
                    // }))
                    // if (setRedis) {
                    return res.status(200).json({
                        success: true,
                        message: "get user successfully --> from database ",
                        data: user,
                        coutPost: countPost,
                        allPost: allPost,
                        checkFollow: checkFollow.length !== 0 ? true : false
                    });
                    // }
                }
                return res.status(404).json({
                    success: false,
                    message: "can not find user"
                });
            }
            catch (error) {
                return res.status(500).json({
                    name: error.name,
                    message: error.message
                });
            }
        });
    }
    // update avatar 
    static updateAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAvatar = yield prismaDb_1.default.user.update({
                    where: {
                        id: +req.params.id
                    },
                    data: {
                        avatar: req.body.avatar
                    }
                });
                if (!newAvatar)
                    return res.status(400).json({
                        success: false,
                        message: "có chút lỗi , vui lòng thử lại"
                    });
                return res.status(200).json({
                    success: true,
                    message: "Thay đổi ảnh đại diện thành công"
                });
            }
            catch (error) {
                return res.status(500).json({
                    name: error.name,
                    message: error.message
                });
            }
        });
    }
}
exports.default = UserController;

import prismaDb from "../configs/prismaDb"

// lưu trữ những người mình đang theo dõi 
class FollowingService {

    private static async checkF(source_id: number, target_id: number) {
        // check xem da theo doi hay chua 
        const checkFollow = await prismaDb.following.findFirst({
            where: {
                AND: [
                    { sourceId: source_id },
                    { targetId: target_id }
                ]
            }
        })

        return checkFollow
    }
    static async create(source_id: number, target_id: number) {
        const checkFollow = await this.checkF(source_id, target_id)
        if (checkFollow) return false
        // theo dõi người khác 
        const following = await prismaDb.following.create({
            data: {
                sourceId: +source_id,
                targetId: +target_id
            }
        })

        return following

    }
    static async unFollow(source_id: number, target_id: number) {
        const checkFollow = await this.checkF(source_id, target_id)
        if (!checkFollow) return false

        const unF = await prismaDb.following.deleteMany({
            where: {
                AND: [
                    { sourceId: source_id },
                    { targetId: target_id }
                ]
            }
        })
        return unF
    }
    // lấy tất cả người dùng đang follow 
    static async getAllPeopleFollowing(source_id: number | any) {
        const data = await prismaDb.following.findMany({
            where: {
                sourceId: +source_id
            },
            select: {
                reciever: {
                    select: {
                        id: true,
                        nickname: true,
                        lastname: true,
                        fistname: true,
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
        })

        return data
    }
    // lấy tất cả người dùng đang theo dõi mình 
    static async getAllPeopleFollowingMe(target_id: number | any) {
        const data = await prismaDb.following.findMany({
            where: {
                targetId: +target_id
            },
            select: {
                sender: {
                    select: {
                        id: true,
                        nickname: true,
                        lastname: true,
                        fistname: true,
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
        })

        return data
    }

}

export default FollowingService
import prismaDb from "../configs/prismaDb"

class NotifycationService {

    static async addNotifycatioin(user_id: number, content: string) {
        const newNotifycation = await prismaDb.notifycation.create({
            data: {
                user_id: +user_id,
                content: content
            }
        })

        return newNotifycation
    }

    static async getAllNotifycation(user_id: number) {
        const notifycation = await prismaDb.notifycation.findMany({
            where : {
                user_id : +user_id
            }
        })

        return notifycation
    }

    
}

export default NotifycationService
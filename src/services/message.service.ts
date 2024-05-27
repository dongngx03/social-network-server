import prismaDb from "../configs/prismaDb"

class MessageService {
    private static async checkMessageExist(id: number) {
        const checkMess = await prismaDb.message.findUnique({
            where: {
                id: +id
            }
        })

        return checkMess
    }

    static async sendMessage({
        senderId,
        receiverId,
        messageContent,
        type
    }: {
        senderId: number,
        receiverId: number,
        messageContent: string,
        type: "TEXT" | "IMAGE"
    }) {
        const sendMess = await prismaDb.message.create({
            data: {
                senderId: senderId,
                receiverId: receiverId,
                messageContent: messageContent,
                type: type
            }
        })

        return sendMess
    }

    // delete message 
    static async deleteMessage(id: number) {
        // check 
        const checkMess = await this.checkMessageExist(id)
        if (!checkMess) return false
        // delete
        const deleteMess = await prismaDb.message.delete({
            where: {
                id: +id
            }
        })

        return deleteMess
    }

    // get all message from box chat 
    static async getAllMessageBoxChat(sender_id: number, receiver_id: number) {
        const mess = await prismaDb.message.findMany({
            where: {
                OR: [
                    { senderId: +sender_id, receiverId: +receiver_id },
                    { senderId: +receiver_id, receiverId: +sender_id }
                ]
            },
            orderBy : {
                sent_At : "desc"
            },
            take : 3
            
        })

        return mess
    }




}

export default MessageService
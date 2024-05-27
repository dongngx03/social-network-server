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
const prismaDb_1 = __importDefault(require("../configs/prismaDb"));
class MessageService {
    static checkMessageExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkMess = yield prismaDb_1.default.message.findUnique({
                where: {
                    id: +id
                }
            });
            return checkMess;
        });
    }
    static sendMessage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ senderId, receiverId, messageContent, type }) {
            const sendMess = yield prismaDb_1.default.message.create({
                data: {
                    senderId: senderId,
                    receiverId: receiverId,
                    messageContent: messageContent,
                    type: type
                }
            });
            return sendMess;
        });
    }
    // delete message 
    static deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // check 
            const checkMess = yield this.checkMessageExist(id);
            if (!checkMess)
                return false;
            // delete
            const deleteMess = yield prismaDb_1.default.message.delete({
                where: {
                    id: +id
                }
            });
            return deleteMess;
        });
    }
    // get all message from box chat 
    static getAllMessageBoxChat(sender_id, receiver_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mess = yield prismaDb_1.default.message.findMany({
                where: {
                    OR: [
                        { senderId: +sender_id, receiverId: +receiver_id },
                        { senderId: +receiver_id, receiverId: +sender_id }
                    ]
                },
                orderBy: {
                    sent_At: "desc"
                },
                take: 3
            });
            return mess;
        });
    }
}
exports.default = MessageService;

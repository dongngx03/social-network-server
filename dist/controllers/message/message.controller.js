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
const constant_1 = require("../../constant");
const response_1 = __importDefault(require("../../core/response"));
const message_service_1 = __importDefault(require("../../services/message.service"));
const util_1 = require("../../util");
class MessageController {
    // gửi tin nhắn 
    static sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sendMess = yield message_service_1.default.sendMessage(req.body);
                return res.status(constant_1.statusCode.CREATED).json((0, response_1.default)(true, "send message successFully!", sendMess));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    // xóa tin nhắn 
    static deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteMess = yield message_service_1.default.deleteMessage(req.params.id);
                if (!deleteMess)
                    return res.status(constant_1.statusCode.NOT_FOUND).json((0, response_1.default)(false, ` message id ${req.params.id} doesn't exist !`, deleteMess));
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, `delete message id ${req.params.id} successFully!`, deleteMess));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    // lấy hết tin nhắn của 1 người với 1 người 
    static getAllMessageFromBoxChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allMessage = yield message_service_1.default.getAllMessageBoxChat(req.body.sender_id, req.body.receiver_id);
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, "get all message successFully !", allMessage));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
}
exports.default = MessageController;

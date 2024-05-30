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
// lưu trữ những người mình đang theo dõi 
class FollowingService {
    static checkF(source_id, target_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // check xem da theo doi hay chua 
            const checkFollow = yield prismaDb_1.default.following.findFirst({
                where: {
                    AND: [
                        { sourceId: source_id },
                        { targetId: target_id }
                    ]
                }
            });
            return checkFollow;
        });
    }
    static create(source_id, target_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkFollow = yield this.checkF(source_id, target_id);
            if (checkFollow)
                return false;
            // theo dõi người khác 
            const following = yield prismaDb_1.default.following.create({
                data: {
                    sourceId: +source_id,
                    targetId: +target_id
                }
            });
            return following;
        });
    }
    static unFollow(source_id, target_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkFollow = yield this.checkF(source_id, target_id);
            if (!checkFollow)
                return false;
            const unF = yield prismaDb_1.default.following.deleteMany({
                where: {
                    AND: [
                        { sourceId: source_id },
                        { targetId: target_id }
                    ]
                }
            });
            return unF;
        });
    }
    // lấy tất cả người dùng đang follow 
    static getAllPeopleFollowing(source_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prismaDb_1.default.following.findMany({
                where: {
                    sourceId: +source_id
                },
                include: {
                    reciever: true
                }
            });
            return data;
        });
    }
    // lấy tất cả người dùng đang theo dõi mình 
    static getAllPeopleFollowingMe(target_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prismaDb_1.default.following.findMany({
                where: {
                    targetId: +target_id
                },
                include: {
                    sender: true
                }
            });
            return data;
        });
    }
}
exports.default = FollowingService;

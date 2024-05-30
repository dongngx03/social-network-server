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
const following_service_1 = __importDefault(require("../../services/following.service"));
const util_1 = require("../../util");
class FollowingController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const following = yield following_service_1.default.create(req.body.source_id, req.body.target_id);
                if (following)
                    return res.status(constant_1.statusCode.CREATED).json((0, response_1.default)(true, `Followed user id:${req.body.target_id} successfully`, following));
                return res.status(constant_1.statusCode.CONFLICT).json((0, response_1.default)(false, "this user was followed !!", following));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    static unFollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unF = yield following_service_1.default.unFollow(req.body.source_id, req.body.target_id);
                if (!unF)
                    return res.status(constant_1.statusCode.CONFLICT).json((0, response_1.default)(false, "this user is not follow", unF));
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, "UnFollow successFully !", unF));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    // get user follow me 
    static getUsersFollowMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield following_service_1.default.getAllPeopleFollowingMe(req.params.target_id);
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, "get all users follow me successfully ! ", data));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    static getUsersFollowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield following_service_1.default.getAllPeopleFollowing(req.params.source_id);
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, "get all users following successfully ! ", data));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
}
exports.default = FollowingController;

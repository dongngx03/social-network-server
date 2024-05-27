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
const comment_service_1 = __importDefault(require("../../services/comment.service"));
const util_1 = require("../../util");
class CommentController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newComment = yield comment_service_1.default.create(req.body);
                return res.status(constant_1.statusCode.CREATED).json((0, response_1.default)(true, "create new comment successFully !", newComment));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const del = yield comment_service_1.default.delete(req.params.id);
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, `delete comemnt id : ${req.params.id} successFully !`, del));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const upd = yield comment_service_1.default.update(req.params.id, req.body);
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, `update comment id : ${req.params.id} successFully!`, upd));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    static getAllCommentFromPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allC = yield comment_service_1.default.getAllCommentParentFromOnePost(req.params.id);
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, "get all comment successFully !", allC));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
    static getAllCommentChildrenFromParent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allC = yield comment_service_1.default.getAllCommentChildrenFromParent(req.param.id, req.params.parent_id);
                return res.status(constant_1.statusCode.OK).json((0, response_1.default)(true, `get all comment children of parent id : ${req.query.parent_comment_id} successFully!`, allC));
            }
            catch (error) {
                return res.status(constant_1.statusCode.INTERNAL_SERVER_ERROR).json((0, util_1.returnMessage)(error));
            }
        });
    }
}
exports.default = CommentController;

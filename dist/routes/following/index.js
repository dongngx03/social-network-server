"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const following_controller_1 = __importDefault(require("../../controllers/following/following.controller"));
const router = (0, express_1.Router)();
// theo dõi người khác 
router.post('/', following_controller_1.default.create);
// hủy theo dõi 
router.post('/un-follow', following_controller_1.default.unFollow);
// lấy tất cả người mình theo dõi 
router.get('/users-follow-me/:target_id', following_controller_1.default.getUsersFollowMe);
// lấy tất cả người mình đang theo dõi 
router.get('/users-following/:source_id', following_controller_1.default.getUsersFollowing);
exports.default = router;

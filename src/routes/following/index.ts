import { Router } from "express";
import FollowingController from "../../controllers/following/following.controller";

const router = Router();

// theo dõi người khác 
router.post('/', FollowingController.create)
// hủy theo dõi 
router.post('/un-follow', FollowingController.unFollow)
// lấy tất cả người mình theo dõi 
router.get('/users-follow-me/:target_id', FollowingController.getUsersFollowMe)
// lấy tất cả người mình đang theo dõi 
router.get('/users-following/:source_id', FollowingController.getUsersFollowing)

export default router
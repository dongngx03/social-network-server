import { Router } from "express";
import CommentController from "../../controllers/comment/comment.controller";

const route = Router();
// comment
route.post("/", CommentController.create)
// xóa comment
route.delete("/:id", CommentController.delete)
// chỉnh sửa comment
route.put("/:id", CommentController.update)
// lấy tất cả comment của lớp cha 
route.get("/:id", CommentController.getAllCommentFromPost)
// lấy comment con theo cha 
route.get("/get-children-comment/:id/:parent_id", CommentController.getAllCommentChildrenFromParent)

export default route
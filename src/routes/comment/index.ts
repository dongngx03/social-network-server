import { Router } from "express";
import CommentController from "../../controllers/comment/comment.controller";

const route = Router();

route.post("/", CommentController.create)
route.delete("/:id", CommentController.delete)
route.put("/:id", CommentController.update)
route.get("/:id", CommentController.getAllCommentFromPost)
route.get("/get-children-comment/:id/:parent_id", CommentController.getAllCommentChildrenFromParent)

export default route
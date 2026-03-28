import express from "express";
import * as commentController from "../controllers/comment.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:postId", commentController.getCommentsByPost);
router.post("/", auth, commentController.createComment);
router.put("/:id", auth, commentController.updateComment);
router.delete("/:id", auth, commentController.deleteComment);
router.post("/:id/vote", auth, commentController.voteComment);

export default router;

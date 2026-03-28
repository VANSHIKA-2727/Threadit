import express from "express";
import * as postController from "../controllers/post.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", auth, postController.createPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);
router.post("/:id/vote", auth, postController.votePost);

export default router;

import express from "express";
import * as userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:username", userController.getUserProfile);
router.put("/:id", auth, userController.updateUserProfile);

export default router;

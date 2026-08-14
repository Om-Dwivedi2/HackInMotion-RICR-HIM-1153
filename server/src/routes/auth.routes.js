import express from "express";
import { register, login, logout, getMe, changePassword } from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.post("/change-password", protect, changePassword);

export default router;

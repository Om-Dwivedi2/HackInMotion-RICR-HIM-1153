import express from "express";
import { updateProfile } from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(protect); // All user routes require authentication

router.patch("/profile", updateProfile);

export default router;

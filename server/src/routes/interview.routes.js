import express from "express";
import { generateInterview, submitInterview } from "../controllers/interview.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(protect);

router.post("/generate", generateInterview);
router.post("/submit", submitInterview);

export default router;

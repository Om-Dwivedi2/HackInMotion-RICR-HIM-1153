import express from "express";
import { analyzeResumeVsJob, getLatestAnalysis } from "../controllers/analysis.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(protect);

router.post("/analyze", analyzeResumeVsJob);
router.get("/latest", getLatestAnalysis);

export default router;

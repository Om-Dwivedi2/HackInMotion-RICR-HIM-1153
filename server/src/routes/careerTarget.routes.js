import express from "express";
import { updateTarget, getActiveTarget, structureTarget } from "../controllers/careerTarget.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(protect);

router.get("/active", getActiveTarget);
router.put("/", updateTarget);
router.post("/structure", structureTarget);

export default router;

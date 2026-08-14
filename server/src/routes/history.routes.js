import express from "express";
import { getHistory } from "../controllers/history.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(protect);

router.get("/", getHistory);

export default router;

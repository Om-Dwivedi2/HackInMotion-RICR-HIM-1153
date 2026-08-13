import express from "express";
import { uploadResume, getResumes, getActiveResume, deleteResume } from "../controllers/resume.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";
import { upload } from "../utils/multer.utils.js";

const router = express.Router();

router.use(protect); // All resume routes require authentication

router.post("/", upload.single('file'), uploadResume);
router.get("/", getResumes);
router.get("/active", getActiveResume);
router.delete("/:id", deleteResume);

export default router;

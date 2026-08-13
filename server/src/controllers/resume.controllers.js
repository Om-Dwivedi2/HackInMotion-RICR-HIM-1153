import path from 'path';
import fs from 'fs';
import Resume from "../modules/resume/resume.model.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a file", data: null });
    }

    // Deactivate previous active resumes
    await Resume.updateMany(
      { userId: req.user._id, isActive: true },
      { $set: { isActive: false } }
    );

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const newResume = await Resume.create({
      userId: req.user._id,
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        fileUrl: fileUrl,
      },
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      data: newResume
    });
  } catch (error) {
    next(error);
  }
};

export const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      message: "Resumes fetched successfully",
      data: resumes
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id, isActive: true });
    
    return res.status(200).json({
      success: true,
      message: "Active resume fetched successfully",
      data: resume || null
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found", data: null });
    }

    const filePath = path.join(process.cwd(), 'uploads', resume.file.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
      data: null
    });
  } catch (error) {
    next(error);
  }
};

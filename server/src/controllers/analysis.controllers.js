import Resume from "../modules/resume/resume.model.js";
import CareerTarget from "../modules/careerTarget/careerTarget.model.js";
import Analysis from "../modules/analysis/analysis.model.js";
import { analyzeResumeVsJobWithAI } from "../services/ai.service.js";
import { AppError } from "../utils/error.utils.js";

export const analyzeResumeVsJob = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // 1. Fetch active resume and career target
    const resume = await Resume.findOne({ userId, isActive: true });
    if (!resume) {
      throw new AppError("No active resume found", 404);
    }
    if (!resume.parsedData) {
      throw new AppError("Resume has not been parsed yet", 400);
    }

    const target = await CareerTarget.findOne({ userId, isActive: true });
    if (!target) {
      throw new AppError("No active career target found", 404);
    }
    if (!target.jobDescription?.extractedRequirements) {
      throw new AppError("Job description has not been parsed yet", 400);
    }

    // 2. AI Comparison & Explanation
    const aiAnalysis = await analyzeResumeVsJobWithAI(
      resume.parsedData,
      target.jobDescription.extractedRequirements,
      { role: target.role, company: target.company || 'Unknown' }
    );

    // 3. Save Analysis
    const analysis = new Analysis({
      userId,
      resumeId: resume._id,
      careerTargetId: target._id,
      status: "completed",
      matchScore: aiAnalysis.matchScore,
      skillAnalysis: aiAnalysis.skillAnalysis,
      keywordAnalysis: aiAnalysis.keywordAnalysis,
      experienceProjectFit: aiAnalysis.experienceProjectFit,
      strengths: aiAnalysis.strengths || [],
      weaknesses: aiAnalysis.weaknesses || [],
      recommendations: aiAnalysis.recommendations || [],
      aiMetadata: {
        model: "openrouter",
        analyzedAt: new Date(),
      },
    });

    await analysis.save();

    res.status(201).json({
      success: true,
      data: {
        analysis,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLatestAnalysis = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const analysis = await Analysis.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate('resumeId', 'file.originalName')
      .populate('careerTargetId', 'role company');

    if (!analysis) {
      return res.status(200).json({
        success: true,
        data: {
          analysis: null,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        analysis,
      },
    });
  } catch (error) {
    next(error);
  }
};

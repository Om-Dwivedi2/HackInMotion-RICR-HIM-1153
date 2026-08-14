import Resume from "../modules/resume/resume.model.js";
import CareerTarget from "../modules/careerTarget/careerTarget.model.js";
import Analysis from "../modules/analysis/analysis.model.js";
import { calculateDeterministicScore } from "../services/analysis.service.js";
import { generateAnalysisExplanation } from "../services/ai.service.js";
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

    // 2. Deterministic Comparison
    const deterministicFindings = calculateDeterministicScore(
      resume.parsedData,
      target.jobDescription.extractedRequirements
    );

    // 3. AI Explanation & Recommendations
    let aiExplanation = { recommendations: [] };
    try {
      aiExplanation = await generateAnalysisExplanation(
        deterministicFindings,
        deterministicFindings.score,
        { role: target.role, company: target.company || 'Unknown' }
      );
    } catch (error) {
      console.warn("AI Explanation failed, proceeding with deterministic results only:", error);
    }

    // 4. Save Analysis
    const analysis = new Analysis({
      userId,
      resumeId: resume._id,
      careerTargetId: target._id,
      status: "completed",
      matchScore: {
        score: deterministicFindings.score,
        label: deterministicFindings.label,
      },
      skillAnalysis: deterministicFindings.skillAnalysis,
      keywordAnalysis: deterministicFindings.keywordAnalysis,
      strengths: deterministicFindings.strengths,
      recommendations: aiExplanation.recommendations || [],
      aiMetadata: {
        model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20241022",
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

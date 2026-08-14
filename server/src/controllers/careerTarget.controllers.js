import CareerTarget from "../modules/careerTarget/careerTarget.model.js";

export const updateTarget = async (req, res, next) => {
  try {
    const { role, company, jobDescriptionText } = req.body;

    if (!role || !role.trim()) {
      return res.status(400).json({ success: false, message: "Target role is required", data: null });
    }

    if (!jobDescriptionText || !jobDescriptionText.trim()) {
      return res.status(400).json({ success: false, message: "Job description is required", data: null });
    }

    await CareerTarget.updateMany(
      { userId: req.user._id, isActive: true },
      { $set: { isActive: false } }
    );

    const newTarget = await CareerTarget.create({
      userId: req.user._id,
      role: role.trim(),
      company: company ? company.trim() : "",
      jobDescription: jobDescriptionText ? { rawText: jobDescriptionText } : undefined,
      isActive: true
    });

    return res.status(200).json({
      success: true,
      message: "Career preferences updated successfully",
      data: newTarget
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveTarget = async (req, res, next) => {
  try {
    const target = await CareerTarget.findOne({ userId: req.user._id, isActive: true });
    
    return res.status(200).json({
      success: true,
      message: "Active career target fetched successfully",
      data: target || null
    });
  } catch (error) {
    next(error);
  }
};

import { parseJobDescriptionText } from '../services/ai.service.js';

export const structureTarget = async (req, res, next) => {
  try {
    const target = await CareerTarget.findOne({ userId: req.user._id, isActive: true });
    
    if (!target) {
      return res.status(404).json({ success: false, message: "No active career target found", data: null });
    }

    if (!target.jobDescription || !target.jobDescription.rawText) {
      return res.status(400).json({ success: false, message: "Career target has no raw job description to process", data: null });
    }

    const structuredRequirements = await parseJobDescriptionText(target.jobDescription.rawText);
    
    // Validate output structure minimally to ensure it matches schema requirements
    if (!structuredRequirements || typeof structuredRequirements !== 'object') {
      return res.status(500).json({ success: false, message: "Invalid AI response structure", data: null });
    }

    target.jobDescription.extractedRequirements = structuredRequirements;
    await target.save();

    return res.status(200).json({
      success: true,
      message: "Job description successfully structured by AI",
      data: target
    });
  } catch (error) {
    console.error("Structure Target Error:", error);
    next(error);
  }
};

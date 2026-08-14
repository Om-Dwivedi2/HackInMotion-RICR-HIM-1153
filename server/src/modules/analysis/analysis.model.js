import mongoose from "mongoose";

const matchScoreSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    label: String,
  },
  { _id: false }
);

const matchedSkillSchema = new mongoose.Schema(
  {
    skill: String,
    evidence: String,
  },
  { _id: false }
);

const weakSkillSchema = new mongoose.Schema(
  {
    skill: String,
    evidence: String,
    reason: String,
  },
  { _id: false }
);

const missingSkillSchema = new mongoose.Schema(
  {
    skill: String,
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
    },
    reason: String,
  },
  { _id: false }
);

const skillAnalysisSchema = new mongoose.Schema(
  {
    matched: [matchedSkillSchema],
    weak: [weakSkillSchema],
    missing: [missingSkillSchema],
  },
  { _id: false }
);

const keywordAnalysisSchema = new mongoose.Schema(
  {
    matched: [String],
    weak: [String],
    missing: [String],
  },
  { _id: false }
);

const experienceProjectFitSchema = new mongoose.Schema(
  {
    experience: {
      level: {
        type: String,
        enum: ["strong", "moderate", "weak", "poor"],
      },
      explanation: String,
    },
    projects: {
      level: {
        type: String,
        enum: ["strong", "moderate", "weak", "poor"],
      },
      explanation: String,
    },
  },
  { _id: false }
);

const recommendationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
    },
  },
  { _id: false }
);

const aiMetadataSchema = new mongoose.Schema(
  {
    model: String,
    promptVersion: String,
    analyzedAt: Date,
  },
  { _id: false }
);

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    careerTargetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerTarget",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },
    matchScore: matchScoreSchema,
    skillAnalysis: skillAnalysisSchema,
    keywordAnalysis: keywordAnalysisSchema,
    experienceProjectFit: experienceProjectFitSchema,
    strengths: [String],
    weaknesses: [String],
    recommendations: [recommendationSchema],
    aiMetadata: aiMetadataSchema,
  },
  {
    timestamps: true,
  }
);

analysisSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Analysis", analysisSchema);

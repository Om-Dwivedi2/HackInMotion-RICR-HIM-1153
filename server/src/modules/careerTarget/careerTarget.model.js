import mongoose from "mongoose";

const extractedRequirementsSchema = new mongoose.Schema(
  {
    skills: [String],
    keywords: [String],
    responsibilities: [String],
    experience: [String],
    education: [String],
  },
  { _id: false }
);

const jobDescriptionSchema = new mongoose.Schema(
  {
    rawText: String,
    extractedRequirements: extractedRequirementsSchema,
  },
  { _id: false }
);

const careerTargetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    jobDescription: jobDescriptionSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CareerTarget", careerTargetSchema);

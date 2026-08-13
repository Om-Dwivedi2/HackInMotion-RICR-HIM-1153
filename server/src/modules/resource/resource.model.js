import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["course", "documentation", "tutorial", "video", "article"],
      required: true,
    },
    provider: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    skill: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LearningResource", resourceSchema);

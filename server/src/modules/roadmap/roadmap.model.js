import mongoose from "mongoose";

const stepSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
      min: 1,
    },
    skill: {
      type: String,
      required: true,
    },
    priority: String,
    why: String,
    learn: [String],
    practice: [String],
    build: [String],
    resourceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningResource",
      },
    ],
    status: {
      type: String,
      enum: ["locked", "available", "in_progress", "completed"],
      default: "available",
    },
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    analysisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
      required: true,
      index: true,
    },
    careerTargetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerTarget",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    steps: [stepSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LearningRoadmap", roadmapSchema);

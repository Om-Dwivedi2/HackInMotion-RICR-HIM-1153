import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    type: { type: String, enum: ["Technical Question", "Behavioral Question", "System Design"], required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: Number, required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const feedbackMetricSchema = new mongoose.Schema(
  {
    relevance: { type: Number, min: 0, max: 100 },
    clarity: { type: Number, min: 0, max: 100 },
    completeness: { type: Number, min: 0, max: 100 }
  },
  { _id: false }
);

const feedbackSchema = new mongoose.Schema(
  {
    score: { type: Number, min: 0, max: 100 },
    metrics: feedbackMetricSchema,
    positive: [String],
    improvement: [String]
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
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
      enum: ["setup", "active", "completed"],
      default: "setup",
      index: true,
    },
    questions: [questionSchema],
    answers: [answerSchema],
    feedback: feedbackSchema,
  },
  {
    timestamps: true,
  }
);

interviewSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Interview", interviewSchema);

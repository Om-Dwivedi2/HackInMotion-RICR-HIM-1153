import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    jobTitle: String,
    startDate: Date,
    endDate: Date,
    description: [String],
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    technologies: [String],
  },
  { _id: false }
);

const parsedDataSchema = new mongoose.Schema(
  {
    summary: String,
    skills: [skillSchema],
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    certifications: [String],
    achievements: [String],
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    file: {
      type: fileSchema,
      required: true,
    },
    extractedText: String,
    parsedData: parsedDataSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);

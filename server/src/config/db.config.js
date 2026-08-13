import mongoose from "mongoose";
import { envConfig } from "./env.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("[DB Error] MongoDB connection failure:", error.message);
    process.exit(1);
  }
};

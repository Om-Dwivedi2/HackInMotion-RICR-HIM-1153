import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { envConfig } from "./config/env.config.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { notFoundHandler, globalErrorHandler } from "./middlewares/error.middlewares.js";

const app = express();

// Global Middlewares
app.use(
  cors({
    origin: envConfig.clientUrl,
    credentials: true,
  })
);

if (envConfig.nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

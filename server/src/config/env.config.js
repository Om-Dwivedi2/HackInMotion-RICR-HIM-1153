import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "NODE_ENV",
  "PORT",
  "MONGO_URI",
  "CLIENT_URL",
  "JWT_SECRET",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`[Env Error] Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

if (!process.env.OPENROUTER_API_KEY) {
  console.error(`[Env Warning] OPENROUTER_API_KEY is not configured. AI features will fail.`);
}

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
  openRouterSiteUrl: process.env.OPENROUTER_SITE_URL || "",
  openRouterSiteName: process.env.OPENROUTER_SITE_NAME || "CareerLens",
};

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// NEW CODE - Require a production MongoDB URI instead of silently falling back to localhost.
const requiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`[config] Missing required environment variable: ${name}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5001", 10),
  // NEW CODE - Use the configured production MongoDB connection string and fail clearly when it is missing.
  mongodbUri: requiredEnv("MONGODB_URI"),

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "dev_access_secret_change_me",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "dev_refresh_secret_change_me",
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  adminName: process.env.ADMIN_NAME || "Health Box Admin",

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:8443",

  uploadMaxSizeMb: parseInt(process.env.UPLOAD_MAX_SIZE_MB || "5", 10),

  isProduction: process.env.NODE_ENV === "production",
};

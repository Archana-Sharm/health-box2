import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import mongoose from "mongoose";

import { env } from "./config/env";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";

import authRoutes from "./routes/authRoutes";
import bannerRoutes from "./routes/bannerRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import socialRoutes from "./routes/socialRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import enquiryRoutes from "./routes/enquiryRoutes";
import publicRoutes from "./routes/publicRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

const app = express();

// ---------- Security & core middleware ----------
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());
app.use(morgan(env.isProduction ? "combined" : "dev"));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// ---------- Static uploads ----------
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// ---------- Health check ----------
app.get("/api/health", (_req: Request, res: Response) => {
  const database = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(200).json({
    success: true,
    message: "Health Box API is running",
    database,
  });
});

// ---------- Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ---------- 404 + error handling ----------
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

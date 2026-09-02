import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { env } from "../config/env";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function makeStorage(subfolder: string) {
  const uploadDir = path.resolve(__dirname, "../../uploads", subfolder);
  ensureDir(uploadDir);

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, unique);
    },
  });
}

function fileFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, WEBP, and GIF images are allowed."));
  }
}

function buildUploader(subfolder: string) {
  return multer({
    storage: makeStorage(subfolder),
    fileFilter,
    limits: { fileSize: env.uploadMaxSizeMb * 1024 * 1024 },
  });
}

export const uploadBanner = buildUploader("banners");
export const uploadDoctor = buildUploader("doctors");
export const uploadSettings = buildUploader("settings");

// Public URL builder for a stored file — replace this implementation to
// switch to Cloudinary / S3 / another provider without touching callers.
export function toPublicPath(subfolder: string, filename: string): string {
  return `/uploads/${subfolder}/${filename}`;
}

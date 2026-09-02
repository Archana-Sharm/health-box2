import { Response } from "express";
import { AuthRequest } from "../types";
import { SiteSettings } from "../models/SiteSettings";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/ApiResponse";
import { toPublicPath } from "../middleware/upload";
import fs from "fs";
import path from "path";

type MulterFiles = { [fieldname: string]: Express.Multer.File[] };

function deleteUploadedFile(publicPath?: string): void {
  if (!publicPath) return;
  const filePath = path.resolve(__dirname, "../../", publicPath.replace(/^\//, ""));
  fs.unlink(filePath, () => {
    /* best-effort cleanup */
  });
}

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

export const getSettings = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const settings = await getOrCreateSettings();
  sendSuccess(res, settings);
});

export const updateSettings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const settings = await getOrCreateSettings();
  const body = req.body as Record<string, string>;
  const files = req.files as MulterFiles | undefined;

  const fields = [
    "websiteName",
    "phone",
    "email",
    "address",
    "openingHours",
    "googleMapsUrl",
    "footerDescription",
  ] as const;

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      (settings as unknown as Record<string, unknown>)[field] = body[field];
    }
  });

  const logoFile = files?.logo?.[0];
  const faviconFile = files?.favicon?.[0];

  if (logoFile) {
    deleteUploadedFile(settings.logo);
    settings.logo = toPublicPath("settings", logoFile.filename);
  }
  if (faviconFile) {
    deleteUploadedFile(settings.favicon);
    settings.favicon = toPublicPath("settings", faviconFile.filename);
  }

  await settings.save();
  sendSuccess(res, settings, "Website settings updated successfully.");
});

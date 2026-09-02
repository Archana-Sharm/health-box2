import { Response } from "express";
import { AuthRequest } from "../types";
import { Banner } from "../models/Banner";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/ApiResponse";
import { toPublicPath } from "../middleware/upload";
import fs from "fs";
import path from "path";

type MulterFiles = { [fieldname: string]: Express.Multer.File[] };

function deleteUploadedFile(publicPath?: string): void {
  if (!publicPath) return;
  const filePath = path.resolve(__dirname, "../../", publicPath.replace(/^\//, ""));
  fs.unlink(filePath, () => {
    /* best-effort cleanup, ignore errors */
  });
}

export const getBanners = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { search = "", status, page = "1", limit = "10" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = {};
  if (search) filter.heading = { $regex: search, $options: "i" };
  if (status) filter.status = status;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

  const [banners, total] = await Promise.all([
    Banner.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Banner.countDocuments(filter),
  ]);

  sendSuccess(res, banners, "Banners fetched.", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    pages: Math.ceil(total / limitNum),
  });
});

export const getBannerById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) throw new ApiError(404, "Banner not found.");
  sendSuccess(res, banner);
});

export const createBanner = asyncHandler(async (req: AuthRequest, res: Response) => {
  const files = req.files as MulterFiles | undefined;
  const desktopFile = files?.desktopImage?.[0];
  const mobileFile = files?.mobileImage?.[0];

  if (!desktopFile || !mobileFile) {
    throw new ApiError(400, "Both desktop and mobile banner images are required.");
  }

  const { heading, subheading, buttonText, buttonUrl, displayOrder, status } = req.body as Record<
    string,
    string
  >;

  if (!heading) throw new ApiError(400, "Banner heading is required.");

  const banner = await Banner.create({
    heading,
    subheading,
    buttonText,
    buttonUrl,
    displayOrder: Number(displayOrder) || 0,
    status: status === "inactive" ? "inactive" : "active",
    desktopImage: toPublicPath("banners", desktopFile.filename),
    mobileImage: toPublicPath("banners", mobileFile.filename),
  });

  sendSuccess(res, banner, "Banner created successfully.", 201);
});

export const updateBanner = asyncHandler(async (req: AuthRequest, res: Response) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) throw new ApiError(404, "Banner not found.");

  const files = req.files as MulterFiles | undefined;
  const desktopFile = files?.desktopImage?.[0];
  const mobileFile = files?.mobileImage?.[0];

  const { heading, subheading, buttonText, buttonUrl, displayOrder, status } = req.body as Record<
    string,
    string
  >;

  if (heading !== undefined) banner.heading = heading;
  if (subheading !== undefined) banner.subheading = subheading;
  if (buttonText !== undefined) banner.buttonText = buttonText;
  if (buttonUrl !== undefined) banner.buttonUrl = buttonUrl;
  if (displayOrder !== undefined) banner.displayOrder = Number(displayOrder) || 0;
  if (status !== undefined) banner.status = status === "inactive" ? "inactive" : "active";

  if (desktopFile) {
    deleteUploadedFile(banner.desktopImage);
    banner.desktopImage = toPublicPath("banners", desktopFile.filename);
  }
  if (mobileFile) {
    deleteUploadedFile(banner.mobileImage);
    banner.mobileImage = toPublicPath("banners", mobileFile.filename);
  }

  await banner.save();
  sendSuccess(res, banner, "Banner updated successfully.");
});

export const deleteBanner = asyncHandler(async (req: AuthRequest, res: Response) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) throw new ApiError(404, "Banner not found.");

  deleteUploadedFile(banner.desktopImage);
  deleteUploadedFile(banner.mobileImage);
  await banner.deleteOne();

  sendSuccess(res, {}, "Banner deleted successfully.");
});

export const toggleBannerStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) throw new ApiError(404, "Banner not found.");

  banner.status = banner.status === "active" ? "inactive" : "active";
  await banner.save();

  sendSuccess(res, banner, `Banner ${banner.status === "active" ? "enabled" : "disabled"} successfully.`);
});

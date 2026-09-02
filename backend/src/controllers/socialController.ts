import { Response } from "express";
import { AuthRequest } from "../types";
import { SocialMedia } from "../models/SocialMedia";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/ApiResponse";

async function getOrCreateSocial() {
  let social = await SocialMedia.findOne();
  if (!social) {
    social = await SocialMedia.create({ facebookUrl: "", instagramUrl: "" });
  }
  return social;
}

export const getSocial = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const social = await getOrCreateSocial();
  sendSuccess(res, social);
});

export const updateSocial = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { facebookUrl, instagramUrl } = req.body as { facebookUrl?: string; instagramUrl?: string };

  const social = await getOrCreateSocial();
  if (facebookUrl !== undefined) social.facebookUrl = facebookUrl;
  if (instagramUrl !== undefined) social.instagramUrl = instagramUrl;
  await social.save();

  sendSuccess(res, social, "Social media links updated successfully.");
});

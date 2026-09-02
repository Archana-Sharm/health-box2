import { Response } from "express";
import { AuthRequest } from "../types";
import { Banner } from "../models/Banner";
import { Doctor } from "../models/Doctor";
import { SocialMedia } from "../models/SocialMedia";
import { SiteSettings } from "../models/SiteSettings";
import { Appointment } from "../models/Appointment";
import { ContactEnquiry } from "../models/ContactEnquiry";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/ApiResponse";

// ---------- PUBLIC (read-only, active content only) ----------

export const getPublicBanners = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const banners = await Banner.find({ status: "active" }).sort({ displayOrder: 1 });
  sendSuccess(res, banners);
});

export const getPublicDoctors = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { department, specialization } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = { status: "active" };
  if (department) filter.department = department;
  if (specialization) filter.specialization = specialization;

  const doctors = await Doctor.find(filter).sort({ name: 1 });
  sendSuccess(res, doctors);
});

export const getPublicSocial = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const social = (await SocialMedia.findOne()) || { facebookUrl: "", instagramUrl: "" };
  sendSuccess(res, social);
});

export const getPublicSettings = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const settings = (await SiteSettings.findOne()) || {};
  sendSuccess(res, settings);
});

// ---------- ADMIN DASHBOARD ----------

export const getDashboardStats = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const [
    totalBanners,
    activeBanners,
    totalDoctors,
    activeDoctors,
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    totalEnquiries,
    unreadEnquiries,
    recentAppointments,
    recentEnquiries,
    recentDoctors,
    recentBanners,
  ] = await Promise.all([
    Banner.countDocuments(),
    Banner.countDocuments({ status: "active" }),
    Doctor.countDocuments(),
    Doctor.countDocuments({ status: "active" }),
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: "pending" }),
    Appointment.countDocuments({ status: "confirmed" }),
    ContactEnquiry.countDocuments(),
    ContactEnquiry.countDocuments({ isRead: false }),
    Appointment.find().populate("doctor", "name").sort({ createdAt: -1 }).limit(5),
    ContactEnquiry.find().sort({ createdAt: -1 }).limit(5),
    Doctor.find().sort({ createdAt: -1 }).limit(5),
    Banner.find().sort({ updatedAt: -1 }).limit(5),
  ]);

  sendSuccess(res, {
    stats: {
      totalBanners,
      activeBanners,
      totalDoctors,
      activeDoctors,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalEnquiries,
      unreadEnquiries,
    },
    recent: {
      appointments: recentAppointments,
      enquiries: recentEnquiries,
      doctors: recentDoctors,
      banners: recentBanners,
    },
  });
});

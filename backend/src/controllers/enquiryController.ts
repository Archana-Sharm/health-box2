import { Response } from "express";
import { AuthRequest } from "../types";
import { ContactEnquiry } from "../models/ContactEnquiry";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/ApiResponse";

export const getEnquiries = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { search = "", isRead, page = "1", limit = "10" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (isRead !== undefined) filter.isRead = isRead === "true";

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

  const [enquiries, total, unreadCount] = await Promise.all([
    ContactEnquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    ContactEnquiry.countDocuments(filter),
    ContactEnquiry.countDocuments({ isRead: false }),
  ]);

  sendSuccess(res, enquiries, "Enquiries fetched.", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    pages: Math.ceil(total / limitNum),
    unreadCount,
  });
});

export const getEnquiryById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) throw new ApiError(404, "Enquiry not found.");
  sendSuccess(res, enquiry);
});

// Public — used by the contact form on the website
export const createEnquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, mobile, email, message } = req.body as Record<string, string>;

  if (!name || !mobile || !message) {
    throw new ApiError(400, "Name, mobile, and message are required.");
  }

  const enquiry = await ContactEnquiry.create({ name, mobile, email, message });
  sendSuccess(res, enquiry, "Thank you for reaching out. We will get back to you shortly.", 201);
});

export const markEnquiryRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { isRead } = req.body as { isRead?: boolean };

  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) throw new ApiError(404, "Enquiry not found.");

  enquiry.isRead = isRead === undefined ? true : Boolean(isRead);
  await enquiry.save();

  sendSuccess(res, enquiry, `Enquiry marked as ${enquiry.isRead ? "read" : "unread"}.`);
});

export const deleteEnquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) throw new ApiError(404, "Enquiry not found.");
  await enquiry.deleteOne();
  sendSuccess(res, {}, "Enquiry deleted successfully.");
});

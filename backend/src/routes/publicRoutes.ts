import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  getPublicBanners,
  getPublicDoctors,
  getPublicSocial,
  getPublicSettings,
} from "../controllers/publicController";
import { createAppointment } from "../controllers/appointmentController";
import { createEnquiry } from "../controllers/enquiryController";

const router = Router();

// Basic abuse protection for public form submissions
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many submissions. Please try again later." },
});

router.get("/banners", getPublicBanners);
router.get("/doctors", getPublicDoctors);
router.get("/social", getPublicSocial);
router.get("/settings", getPublicSettings);

router.post("/appointments", formLimiter, createAppointment);
router.post("/enquiries", formLimiter, createEnquiry);

export default router;

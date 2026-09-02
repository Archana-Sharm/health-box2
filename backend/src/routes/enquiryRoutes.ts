import { Router } from "express";
import {
  getEnquiries,
  getEnquiryById,
  markEnquiryRead,
  deleteEnquiry,
} from "../controllers/enquiryController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/", getEnquiries);
router.get("/:id", getEnquiryById);
router.patch("/:id/read", markEnquiryRead);
router.delete("/:id", deleteEnquiry);

export default router;

import { Router } from "express";
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
} from "../controllers/bannerController";
import { requireAuth } from "../middleware/auth";
import { uploadBanner } from "../middleware/upload";

const router = Router();

const bannerImages = uploadBanner.fields([
  { name: "desktopImage", maxCount: 1 },
  { name: "mobileImage", maxCount: 1 },
]);

router.use(requireAuth);

router.get("/", getBanners);
router.post("/", bannerImages, createBanner);
router.get("/:id", getBannerById);
router.put("/:id", bannerImages, updateBanner);
router.delete("/:id", deleteBanner);
router.patch("/:id/toggle-status", toggleBannerStatus);

export default router;

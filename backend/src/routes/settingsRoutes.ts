import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingsController";
import { requireAuth } from "../middleware/auth";
import { uploadSettings } from "../middleware/upload";

const router = Router();

const settingsImages = uploadSettings.fields([
  { name: "logo", maxCount: 1 },
  { name: "favicon", maxCount: 1 },
]);

router.use(requireAuth);

router.get("/", getSettings);
router.put("/", settingsImages, updateSettings);

export default router;

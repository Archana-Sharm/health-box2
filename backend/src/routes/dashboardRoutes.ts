import { Router } from "express";
import { getDashboardStats } from "../controllers/publicController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);
router.get("/", getDashboardStats);

export default router;

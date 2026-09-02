import { Router } from "express";
import { login, logout, me, refresh, updateProfile } from "../controllers/authController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", requireAuth, me);
router.put("/profile", requireAuth, updateProfile);

export default router;

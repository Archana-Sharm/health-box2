import { Router } from "express";
import { getSocial, updateSocial } from "../controllers/socialController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/", getSocial);
router.put("/", updateSocial);

export default router;

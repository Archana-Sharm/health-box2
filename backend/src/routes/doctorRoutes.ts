import { Router } from "express";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  toggleDoctorStatus,
} from "../controllers/doctorController";
import { requireAuth } from "../middleware/auth";
import { uploadDoctor } from "../middleware/upload";

const router = Router();

router.use(requireAuth);

router.get("/", getDoctors);
router.post("/", uploadDoctor.single("photo"), createDoctor);
router.get("/:id", getDoctorById);
router.put("/:id", uploadDoctor.single("photo"), updateDoctor);
router.delete("/:id", deleteDoctor);
router.patch("/:id/toggle-status", toggleDoctorStatus);

export default router;

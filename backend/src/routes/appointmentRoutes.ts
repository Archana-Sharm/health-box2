import { Router } from "express";
import {
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentController";
import { requireAuth } from "../middleware/auth";

const router = Router();

// All appointment management routes are admin-only.
// Public appointment creation lives under /api/public/appointments (see publicRoutes.ts).
router.use(requireAuth);

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

export default router;

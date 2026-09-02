import { Response } from "express";
import { AuthRequest } from "../types";
import { Appointment } from "../models/Appointment";
import { Doctor } from "../models/Doctor";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/ApiResponse";

export const getAppointments = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { search = "", status, page = "1", limit = "10" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { patientName: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
    ];
  }
  if (status) filter.status = status;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

  const [appointments, total] = await Promise.all([
    Appointment.find(filter)
      .populate("doctor", "name specialization department")
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Appointment.countDocuments(filter),
  ]);

  sendSuccess(res, appointments, "Appointments fetched.", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    pages: Math.ceil(total / limitNum),
  });
});

export const getAppointmentById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "doctor",
    "name specialization department"
  );
  if (!appointment) throw new ApiError(404, "Appointment not found.");
  sendSuccess(res, appointment);
});

// Public — used by the appointment booking form on the website
export const createAppointment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { patientName, mobile, email, doctor, preferredDate, preferredTime, message } = req.body as Record<
    string,
    string
  >;

  if (!patientName || !mobile || !doctor || !preferredDate || !preferredTime) {
    throw new ApiError(400, "Patient name, mobile, doctor, date, and time are required.");
  }

  const doctorExists = await Doctor.findById(doctor);
  if (!doctorExists) {
    throw new ApiError(400, "Selected doctor does not exist.");
  }

  const appointment = await Appointment.create({
    patientName,
    mobile,
    email,
    doctor,
    preferredDate,
    preferredTime,
    message,
  });

  sendSuccess(res, appointment, "Appointment requested successfully. We will contact you shortly.", 201);
});

export const updateAppointmentStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body as { status?: string };
  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!status || !allowed.includes(status)) {
    throw new ApiError(400, "Invalid status value.");
  }

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) throw new ApiError(404, "Appointment not found.");

  appointment.status = status as typeof appointment.status;
  await appointment.save();

  sendSuccess(res, appointment, "Appointment status updated successfully.");
});

export const deleteAppointment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) throw new ApiError(404, "Appointment not found.");
  await appointment.deleteOne();
  sendSuccess(res, {}, "Appointment deleted successfully.");
});

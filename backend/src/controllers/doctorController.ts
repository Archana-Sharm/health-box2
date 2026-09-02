import { Response } from "express";
import { AuthRequest } from "../types";
import { Doctor } from "../models/Doctor";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/ApiResponse";
import { toPublicPath } from "../middleware/upload";
import fs from "fs";
import path from "path";

function deleteUploadedFile(publicPath?: string): void {
  if (!publicPath) return;
  const filePath = path.resolve(__dirname, "../../", publicPath.replace(/^\//, ""));
  fs.unlink(filePath, () => {
    /* best-effort cleanup */
  });
}

function parseAvailability(raw: unknown): Record<string, unknown> | undefined {
  if (!raw) return undefined;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }
  return raw as Record<string, unknown>;
}

export const getDoctors = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { search = "", status, department, page = "1", limit = "10" } = req.query as Record<
    string,
    string
  >;

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { specialization: { $regex: search, $options: "i" } },
      { department: { $regex: search, $options: "i" } },
    ];
  }
  if (status) filter.status = status;
  if (department) filter.department = department;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

  const [doctors, total] = await Promise.all([
    Doctor.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Doctor.countDocuments(filter),
  ]);

  sendSuccess(res, doctors, "Doctors fetched.", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    pages: Math.ceil(total / limitNum),
  });
});

export const getDoctorById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) throw new ApiError(404, "Doctor not found.");
  sendSuccess(res, doctor);
});

export const createDoctor = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body as Record<string, string>;
  const photoFile = req.file;

  const doctor = await Doctor.create({
    name: body.name,
    gender: body.gender,
    phone: body.phone,
    email: body.email,
    specialization: body.specialization,
    department: body.department,
    qualification: body.qualification,
    experience: body.experience,
    registrationNumber: body.registrationNumber,
    bio: body.bio,
    status: body.status === "inactive" ? "inactive" : "active",
    availability: parseAvailability(body.availability) || {},
    photo: photoFile ? toPublicPath("doctors", photoFile.filename) : "",
  });

  sendSuccess(res, doctor, "Doctor added successfully.", 201);
});

export const updateDoctor = asyncHandler(async (req: AuthRequest, res: Response) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) throw new ApiError(404, "Doctor not found.");

  const body = req.body as Record<string, string>;
  const photoFile = req.file;

  const fields: (keyof typeof body)[] = [
    "name",
    "gender",
    "phone",
    "email",
    "specialization",
    "department",
    "qualification",
    "experience",
    "registrationNumber",
    "bio",
  ] as const;

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      (doctor as unknown as Record<string, unknown>)[field] = body[field];
    }
  });

  if (body.status !== undefined) {
    doctor.status = body.status === "inactive" ? "inactive" : "active";
  }

  const availability = parseAvailability(body.availability);
  if (availability) {
    doctor.availability = { ...doctor.availability, ...availability } as typeof doctor.availability;
  }

  if (photoFile) {
    deleteUploadedFile(doctor.photo);
    doctor.photo = toPublicPath("doctors", photoFile.filename);
  }

  await doctor.save();
  sendSuccess(res, doctor, "Doctor updated successfully.");
});

export const deleteDoctor = asyncHandler(async (req: AuthRequest, res: Response) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) throw new ApiError(404, "Doctor not found.");

  deleteUploadedFile(doctor.photo);
  await doctor.deleteOne();

  sendSuccess(res, {}, "Doctor deleted successfully.");
});

export const toggleDoctorStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) throw new ApiError(404, "Doctor not found.");

  doctor.status = doctor.status === "active" ? "inactive" : "active";
  await doctor.save();

  sendSuccess(res, doctor, `Doctor ${doctor.status === "active" ? "enabled" : "disabled"} successfully.`);
});

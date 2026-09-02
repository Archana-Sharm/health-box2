import { Request } from "express";

export interface AuthAdmin {
  id: string;
  email: string;
  name?: string;
}

export interface AuthRequest extends Request {
  admin?: AuthAdmin;
}

export type EntityStatus = "active" | "inactive";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

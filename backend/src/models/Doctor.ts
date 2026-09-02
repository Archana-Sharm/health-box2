import { Schema, model, Document, Model } from "mongoose";

export interface IAvailability {
  days: string[];
  startTime?: string;
  endTime?: string;
  consultationTiming?: string;
}

export interface IDoctor extends Document {
  name: string;
  photo?: string;
  gender: "male" | "female" | "other";
  phone: string;
  email?: string;
  specialization: string;
  department: string;
  qualification: string;
  experience: string;
  registrationNumber?: string;
  bio?: string;
  availability: IAvailability;
  status: "active" | "inactive";
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    days: { type: [String], default: [] },
    startTime: { type: String, default: "" },
    endTime: { type: String, default: "" },
    consultationTiming: { type: String, default: "" },
  },
  { _id: false }
);

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: [true, "Doctor name is required"], trim: true },
    photo: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9+\-\s()]{7,15}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    specialization: { type: String, required: [true, "Specialization is required"], trim: true },
    department: { type: String, required: [true, "Department is required"], trim: true },
    qualification: { type: String, required: [true, "Qualification is required"], trim: true },
    experience: { type: String, required: [true, "Experience is required"], trim: true },
    registrationNumber: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    availability: { type: AvailabilitySchema, default: () => ({}) },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
  },
  { timestamps: true }
);

DoctorSchema.index({ name: "text", specialization: "text", department: "text" });

export const Doctor: Model<IDoctor> = model<IDoctor>("Doctor", DoctorSchema);

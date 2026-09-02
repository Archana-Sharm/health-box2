import { Schema, model, Document, Model, Types } from "mongoose";

export interface IAppointment extends Document {
  patientName: string;
  mobile: string;
  email?: string;
  doctor: Types.ObjectId;
  preferredDate: Date;
  preferredTime: string;
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientName: { type: String, required: [true, "Patient name is required"], trim: true },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9+\-\s()]{7,15}$/, "Please provide a valid mobile number"],
    },
    email: { type: String, trim: true, lowercase: true, default: "" },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: [true, "Doctor is required"] },
    preferredDate: { type: Date, required: [true, "Preferred date is required"] },
    preferredTime: { type: String, required: [true, "Preferred time is required"] },
    message: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

AppointmentSchema.index({ patientName: "text", mobile: "text" });

export const Appointment: Model<IAppointment> = model<IAppointment>("Appointment", AppointmentSchema);

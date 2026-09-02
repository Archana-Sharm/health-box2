import { Schema, model, Document, Model } from "mongoose";

export interface IContactEnquiry extends Document {
  name: string;
  mobile: string;
  email?: string;
  message: string;
  isRead: boolean;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9+\-\s()]{7,15}$/, "Please provide a valid mobile number"],
    },
    email: { type: String, trim: true, lowercase: true, default: "" },
    message: { type: String, required: [true, "Message is required"], trim: true },
    isRead: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

ContactEnquirySchema.index({ name: "text", mobile: "text", email: "text" });

export const ContactEnquiry: Model<IContactEnquiry> = model<IContactEnquiry>(
  "ContactEnquiry",
  ContactEnquirySchema
);

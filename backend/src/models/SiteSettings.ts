import { Schema, model, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  websiteName: string;
  logo: string;
  favicon: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  googleMapsUrl: string;
  footerDescription: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    websiteName: { type: String, default: "Health Box Polyclinic & Advance Physiotherapy Center" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: {
      type: String,
      default:
        "Kohinoor Majestic, 1st Floor, Near Thermax Chowk, Chinchwad, Pune – 411019, Maharashtra, India.",
    },
    openingHours: { type: String, default: "Mon - Sat: 9:00 AM - 9:00 PM" },
    googleMapsUrl: { type: String, default: "" },
    footerDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> = model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

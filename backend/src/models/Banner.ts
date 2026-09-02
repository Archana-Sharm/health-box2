import { Schema, model, Document, Model } from "mongoose";

export interface IBanner extends Document {
  desktopImage: string;
  mobileImage: string;
  heading: string;
  subheading?: string;
  buttonText?: string;
  buttonUrl?: string;
  displayOrder: number;
  status: "active" | "inactive";
}

const BannerSchema = new Schema<IBanner>(
  {
    desktopImage: { type: String, required: [true, "Desktop banner image is required"] },
    mobileImage: { type: String, required: [true, "Mobile banner image is required"] },
    heading: { type: String, required: [true, "Banner heading is required"], trim: true },
    subheading: { type: String, trim: true, default: "" },
    buttonText: { type: String, trim: true, default: "" },
    buttonUrl: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
  },
  { timestamps: true }
);

BannerSchema.index({ displayOrder: 1 });

export const Banner: Model<IBanner> = model<IBanner>("Banner", BannerSchema);

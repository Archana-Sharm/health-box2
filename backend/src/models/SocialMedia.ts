import { Schema, model, Document, Model } from "mongoose";

export interface ISocialMedia extends Document {
  facebookUrl: string;
  instagramUrl: string;
}

const urlValidator = {
  validator: (v: string) => v === "" || /^https?:\/\/.+/.test(v),
  message: "Please provide a valid URL",
};

const SocialMediaSchema = new Schema<ISocialMedia>(
  {
    facebookUrl: { type: String, trim: true, default: "", validate: urlValidator },
    instagramUrl: { type: String, trim: true, default: "", validate: urlValidator },
  },
  { timestamps: true }
);

export const SocialMedia: Model<ISocialMedia> = model<ISocialMedia>("SocialMedia", SocialMediaSchema);

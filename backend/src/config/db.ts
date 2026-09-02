import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB(): Promise<void> {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.mongodbUri);
    // eslint-disable-next-line no-console
    console.log("MongoDB connected successfully");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[db] MongoDB connection error:", error);
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  // eslint-disable-next-line no-console
  console.warn("[db] MongoDB disconnected");
});

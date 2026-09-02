/* eslint-disable no-console */
import mongoose from "mongoose";
import { env } from "../config/env";
import { Admin } from "../models/Admin";

async function run(): Promise<void> {
  if (!env.adminEmail || !env.adminPassword) {
    console.error("[admin:create] ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  if (env.adminPassword.length < 8) {
    console.error("[admin:create] ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  await mongoose.connect(env.mongodbUri);
  console.log("[admin:create] Connected to MongoDB.");

  const existing = await Admin.findOne({ email: env.adminEmail.toLowerCase() });
  if (existing) {
    console.log(`[admin:create] Admin with email ${env.adminEmail} already exists. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  await Admin.create({
    name: env.adminName,
    email: env.adminEmail.toLowerCase(),
    password: env.adminPassword,
    role: "superadmin",
  });

  console.log(`[admin:create] Admin account created successfully for ${env.adminEmail}.`);
  console.log("[admin:create] Password has been securely hashed and was not logged.");

  await mongoose.disconnect();
}

run().catch((error) => {
  console.error("[admin:create] Failed:", error);
  process.exit(1);
});

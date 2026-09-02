import { Response } from "express";
import { AuthRequest } from "../types";
import { Admin } from "../models/Admin";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/ApiResponse";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/generateToken";
import { env } from "../config/env";

const cookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "lax" as const,
};

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!admin || !admin.isActive) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.");
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  const payload = { id: admin.id, email: admin.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(
    res,
    {
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
      accessToken,
    },
    "Logged in successfully."
  );
});

export const logout = asyncHandler(async (_req: AuthRequest, res: Response) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  sendSuccess(res, {}, "Logged out successfully.");
});

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  const admin = await Admin.findById(req.admin?.id);
  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }
  sendSuccess(res, {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    lastLoginAt: admin.lastLoginAt,
  });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const admin = await Admin.findById(req.admin?.id).select("+password");
  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }

  const { name, email, currentPassword, newPassword } = req.body as {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  };

  if (name && name.trim()) {
    admin.name = name.trim();
  }

  if (email && email.trim()) {
    const nextEmail = email.toLowerCase().trim();
    if (!/^\S+@\S+\.\S+$/.test(nextEmail)) {
      throw new ApiError(400, "Please provide a valid email.");
    }

    const existing = await Admin.findOne({ email: nextEmail, _id: { $ne: admin.id } });
    if (existing) {
      throw new ApiError(409, "An account with this email already exists.");
    }

    admin.email = nextEmail;
  }

  if (newPassword) {
    if (!currentPassword) {
      throw new ApiError(400, "Current password is required to change the password.");
    }

    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new ApiError(401, "Current password is incorrect.");
    }

    if (newPassword.length < 8) {
      throw new ApiError(400, "New password must be at least 8 characters long.");
    }

    admin.password = newPassword;
  }

  await admin.save();

  sendSuccess(res, {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  }, "Profile updated successfully.");
});

export const refresh = asyncHandler(async (req: AuthRequest, res: Response) => {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) {
    throw new ApiError(401, "No refresh token provided.");
  }
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token.");
  }

  const admin = await Admin.findById(payload.id);
  if (!admin || !admin.isActive) {
    throw new ApiError(401, "Admin account not found or inactive.");
  }

  const accessToken = generateAccessToken({ id: admin.id, email: admin.email });
  res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

  sendSuccess(res, { accessToken }, "Token refreshed.");
});

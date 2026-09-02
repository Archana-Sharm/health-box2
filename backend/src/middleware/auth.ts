import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyAccessToken } from "../utils/generateToken";
import { ApiError } from "../utils/ApiError";
import { Admin } from "../models/Admin";

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const tokenFromCookie = req.cookies?.accessToken as string | undefined;
    const authHeader = req.headers.authorization;
    const tokenFromHeader =
      authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      throw new ApiError(401, "Not authenticated. Please log in.");
    }

    const payload = verifyAccessToken(token);

    const admin = await Admin.findById(payload.id);
    if (!admin || !admin.isActive) {
      throw new ApiError(401, "Admin account not found or inactive.");
    }

    req.admin = { id: admin.id, email: admin.email, name: admin.name };
    next();
  } catch (error) {
    next(new ApiError(401, "Not authenticated. Please log in."));
  }
}

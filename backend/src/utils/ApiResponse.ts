import { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200,
  meta?: Record<string, unknown>
): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
}

export function sendError(res: Response, message = "Something went wrong", statusCode = 500): Response {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

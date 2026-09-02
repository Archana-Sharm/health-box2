import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = env.isProduction ? "Something went wrong" : err.message;

    // Mongoose validation error
    if (err.name === "ValidationError") {
      statusCode = 400;
      message = err.message;
    }
    // Mongoose duplicate key error
    if ((err as unknown as { code?: number }).code === 11000) {
      statusCode = 409;
      message = "Duplicate value. This record already exists.";
    }
    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID format.";
    }
    // JWT errors
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Invalid or expired session. Please log in again.";
    }
  }

  if (!env.isProduction && err instanceof Error && !(err instanceof ApiError)) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}

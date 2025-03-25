import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../shared/exceptions/validation-exception";

export const exceptionHandlerMiddleware = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  if (error instanceof ValidationException) {
    console.warn("Validation error.", error);

    response.status(400).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  console.error("Global error. Pleas see inner exception.", error);

  response.status(500).json({
    success: false,
    message: "Something went wrong.",
  });

  return;
};

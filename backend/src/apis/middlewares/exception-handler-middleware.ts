import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../shared/exceptions/validation-exception";
import { UnitResult } from "../../shared/models/result";

export const exceptionHandlerMiddleware = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  if (error instanceof ValidationException) {
    console.warn("Validation error.", error);

    response.status(400).json(UnitResult.Error(error.message));
    return;
  }

  console.error("Global error. Pleas see inner exception.", error);

  response
    .status(500)
    .json(
      UnitResult.Error(`Something went wrong. ${(error as Error).message}`)
    );

  return;
};

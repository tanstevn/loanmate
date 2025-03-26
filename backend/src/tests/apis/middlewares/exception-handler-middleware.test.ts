import request from "supertest";
import express, { Express, NextFunction, Request, Response } from "express";
import { exceptionHandlerMiddleware } from "../../../apis/middlewares/exception-handler-middleware";
import { ValidationException } from "../../../shared/exceptions/validation-exception";

describe("Exception Handler Middleware", () => {
  let app: Express;

  beforeEach(() => {
    app = express();

    app.get(
      "/exception/400",
      (request: Request, response: Response, next: NextFunction) => {
        try {
          throw new ValidationException("Validation exception.");
        } catch (error: unknown) {
          next(error);
        }
      }
    );

    app.get("/exception/500", (request, response, next) => {
      try {
        throw new Error("Global error.");
      } catch (error: unknown) {
        next(error);
      }
    });

    app.use(exceptionHandlerMiddleware);
  });

  it("should return 400 bad request with error message.", async () => {
    const result = await request(app).get("/exception/400");

    expect(result.status).toBe(400);
    expect(result.body.success).toBe(false);
    expect(result.body.message).toBe("Bad request. Validation exception.");
    expect(result.body.stack).not.toBeNull();
  });

  it("should return 500 global error with message.", async () => {
    const result = await request(app).get("/exception/500");

    expect(result.status).toBe(500);
    expect(result.body.success).toBe(false);
    expect(result.body.message).toBe("Something went wrong.");
  });
});

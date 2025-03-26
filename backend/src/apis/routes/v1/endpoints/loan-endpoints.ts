import container from "../../../../infrastructure/inversify/container";
import express, { Router, Request, Response, NextFunction } from "express";
import { CONTROLLERS } from "../../../../shared/types";
import { LoanController } from "../../../controller/loan-controller";

const Controller = container.get(CONTROLLERS.LoanController) as LoanController;

export const mapLoanEndpoints = (): Router => {
  const router = express.Router();

  router.get("/", (request: Request, response: Response, next: NextFunction) =>
    Controller.test(request, response, next)
  );

  router.post("/");

  return router;
};

import container from "../../../../infrastructure/inversify/container";
import express, { Router, Request, Response, NextFunction } from "express";
import { CONTROLLERS } from "../../../../shared/types";
import { LoanController } from "../../../controller/loan-controller";

const controller = container.get(CONTROLLERS.LoanController) as LoanController;

export const mapLoanEndpoints = (): Router => {
  const router = express.Router();

  router.post(
    "/apply",
    async (request: Request, response: Response, next: NextFunction) =>
      controller.apply(request, response, next)
  );

  return router;
};

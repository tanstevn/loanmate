import container from "../../../../infrastructure/inversify/container";
import express, { Router, Request, Response } from "express";
import { CONTROLLERS } from "../../../../shared/types";
import { LoanController } from "../../../controller/loan-controller";

const Controller = container.get(CONTROLLERS.LoanController) as LoanController;

export const mapLoanEndpoints = (): Router => {
  const router = express.Router();

  router.get("/", (request: Request, response: Response) =>
    Controller.test(request, response)
  );

  router.post("/");

  return router;
};

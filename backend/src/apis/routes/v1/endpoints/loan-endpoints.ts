import container from "../../../../infrastructure/inversify/container";
import express, { Router } from "express";
import { CONTROLLERS } from "../../../../shared/types";
import { LoanController } from "../../../controller/loan-controller";

const Controller = container.get(CONTROLLERS.LoanController) as LoanController;

export const mapLoanEndpoints = (): Router => {
  const router = express.Router();

  router.get("/", Controller.test);
  router.post("/");

  return router;
};

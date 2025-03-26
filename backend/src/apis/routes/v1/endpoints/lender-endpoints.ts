import container from "../../../../infrastructure/inversify/container";
import express, { NextFunction, Request, Response, Router } from "express";
import { CONTROLLERS } from "../../../../shared/types";
import { LenderController } from "../../../controller/lender-controller";

const controller = container.get(
  CONTROLLERS.LenderController
) as LenderController;

export const mapLenderEndpoints = (): Router => {
  const router = express.Router();

  router.get(
    "/all",
    (request: Request, response: Response, next: NextFunction) =>
      controller.getAllLenders(request, response, next)
  );

  return router;
};

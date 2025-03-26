import container from "../../../../infrastructure/inversify/container";
import express, { Router } from "express";
import { CONTROLLERS } from "../../../../shared/types";
import { UserController } from "../../../controller/user-controller";

const controller = container.get(CONTROLLERS.UserController) as UserController;

export const mapUserEndpoints = (): Router => {
  const router = express.Router();

  router.get("/", controller.test);
  router.post("/");

  return router;
};

import express, { Router } from "express";
import { mapLoanEndpoints } from "./endpoints/loan-endpoints";
import { mapUserEndpoints } from "./endpoints/user-endpoints";

export const mapV1Routes = (): Router => {
  const router = express.Router();

  router.use("/users", mapUserEndpoints());
  router.use("/loans", mapLoanEndpoints());

  return router;
};

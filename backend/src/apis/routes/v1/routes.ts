import express, { Router } from "express";
import { mapLoanEndpoints } from "./endpoints/loan-endpoints";
import { mapLenderEndpoints } from "./endpoints/lender-endpoints";

export const mapV1Routes = (): Router => {
  const router = express.Router();

  router.use("/lenders", mapLenderEndpoints());
  router.use("/loans", mapLoanEndpoints());

  return router;
};

import express, { Router } from "express";

export const mapLoanEndpoints = (): Router => {
  const router = express.Router();

  router.get("/");
  router.post("/");

  return router;
};

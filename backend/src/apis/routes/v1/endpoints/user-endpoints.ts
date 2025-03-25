import express, { Router } from "express";

export const mapUserEndpoints = (): Router => {
  const router = express.Router();

  router.get("/");
  router.post("/");

  return router;
};

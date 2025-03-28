import { config } from "dotenv";
import "reflect-metadata";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { mapV1Routes } from "./apis/routes/v1/routes";
import { exceptionHandlerMiddleware } from "./apis/middlewares/exception-handler-middleware";

config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", mapV1Routes());

app.use(exceptionHandlerMiddleware);

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`loanmate server is now running on port ${port}...`);
});

export default app;

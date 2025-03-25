import "dotenv/config";
import "reflect-metadata";

import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", (req, res) => {});

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`loanmate server is now running on port ${port}...`);
});

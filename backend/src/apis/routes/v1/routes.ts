import express from "express";

const router = express.Router();

router.use("/users");
router.use("/loans");

export default router;

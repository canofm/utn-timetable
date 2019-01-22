import express from "express";
import { SubjectRouter } from "./routers/subject.router";
import { ErrorHandler } from "./errorHandler";

export const router = express.Router();

router.use("/subject", SubjectRouter);
router.use(ErrorHandler);

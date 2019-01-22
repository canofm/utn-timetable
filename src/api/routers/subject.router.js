import express from "express";
import { SubjectController } from "../controllers";

export const SubjectRouter = express.Router();

SubjectRouter.route("/")
  .get(SubjectController.getAll)
  .post(SubjectController.create);

SubjectRouter.route("/:id")
  .get(SubjectController.get)
  .put(SubjectController.update)
  .delete(SubjectController.delete);

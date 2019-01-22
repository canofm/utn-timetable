import ControllerFactory from "./controller.factory";
import { SubjectService } from "../services";

export const SubjectController = ControllerFactory.createCRUD(new SubjectService());

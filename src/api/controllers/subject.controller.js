import ControllerFactory from "./controller.factory";
import { SubjectService } from "../services";

// TODO, when creating a new subject should use the builder

export const SubjectController = ControllerFactory.createCRUD(new SubjectService());

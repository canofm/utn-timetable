import { SubjectModel } from "../../schemas";
import RepositoryFactory from "./repository.factory";
import { SubjectMapper } from "../mappers";

export const SubjectRepository = RepositoryFactory.createCRUD(
  SubjectModel,
  new SubjectMapper(),
  "Subject"
);

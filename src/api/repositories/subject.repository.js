import { SubjectModel } from "../../schemas";
import RepositoryFactory from "./repository.factory";

export const SubjectRepository = RepositoryFactory.createCRUD(SubjectModel);

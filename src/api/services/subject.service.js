import { isEmpty } from "lodash";
import { SubjectRepository } from "../repositories";

class SubjectService {
  constructor(repository = {}) {
    if (isEmpty(repository)) {
      this.repository = SubjectRepository;
    } else {
      // this is for testing
      this.repository = repository;
    }
  }

  create(subject) {
    return this.repository.create(subject);
  }

  update(id, subject) {
    return this.repository.update(id, subject);
  }

  get(id) {
    return this.repository.get(id);
  }

  getAll() {
    return this.repository.getAll();
  }

  delete(id) {
    return this.repository.delete(id);
  }
}

export const subjectService = SubjectService;

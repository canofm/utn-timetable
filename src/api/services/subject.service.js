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
    this.repository.create(subject);
  }

  update(id, subject) {
    this.repository.update(id, subject);
  }

  get(id) {
    this.repository.get(id);
  }

  getAll() {
    this.repository.getAll();
  }

  delete(id) {
    this.repository.delete(id);
  }
}

export const subjectService = SubjectService;

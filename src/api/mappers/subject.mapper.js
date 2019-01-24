import { Subject } from "../../domain";

class SubjectMapper {
  toDomain(model) {
    return new Subject.Builder()
      .name(model.name)
      .code(model.code)
      .id(model._id.toString())
      .build();
  }
}

export const subjectMapper = SubjectMapper;
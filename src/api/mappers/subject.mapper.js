import { Subject } from "../../domain";

class SubjectMapper {
  toModel(entity) {
    return new Subject.Builder()
      .name(entity.name)
      .code(entity.code)
      .build();
  }

  toDomain(model) {
    return new Subject.Builder()
      .name(model.name)
      .code(model.code)
      .id(model._id)
      .build();
  }
}

export const subjectMapper = SubjectMapper;

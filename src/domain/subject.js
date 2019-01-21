import _ from "lodash";
import { SubjectMustHaveNameException, SubjectMustHaveCodeException } from "../exceptions";

class Subject {
  constructor(build) {
    this.name = build.name;
    this.code = build.code;
  }

  static get Builder() {
    class Builder {
      name(name) {
        this.name = name;
        return this;
      }
      code(code) {
        this.code = code;
        return this;
      }
      build() {
        if (_.isEmpty(this.name)) {
          throw new SubjectMustHaveNameException();
        }
        if (_.isEmpty(this.code)) {
          throw new SubjectMustHaveCodeException();
        }
        return new Subject(this);
      }
    }
    return Builder;
  }
}

export default Subject;

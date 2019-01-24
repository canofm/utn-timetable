import { isEmpty } from "lodash";
import { PropertyLeftException } from "../exceptions";

class Subject {
  constructor(build) {
    this.name = build.name;
    this.code = build.code;
    this.id = build.id;
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

      id(id) {
        this.id = id;
        return this;
      }

      build() {
        if (isEmpty(this.name)) {
          throw new PropertyLeftException("Subject", "name");
        }
        if (isEmpty(this.code)) {
          throw new PropertyLeftException("Subject", "code");
        }
        return new Subject(this);
      }
    }
    return Builder;
  }
}

export default Subject;

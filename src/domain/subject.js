import { isEmpty } from "lodash";
import { PropertyLeftException } from "../exceptions";

class Subject {
  constructor(build) {
    this.name = build._name;
    this.code = build._code;
    this.id = build._id;
  }

  static get Builder() {
    class Builder {
      name(name) {
        this._name = name;
        return this;
      }

      code(code) {
        this._code = code;
        return this;
      }

      id(id) {
        this._id = id;
        return this;
      }

      build() {
        if (isEmpty(this._name)) {
          throw new PropertyLeftException("Subject", "name");
        }
        if (isEmpty(this._code)) {
          throw new PropertyLeftException("Subject", "code");
        }
        return new Subject(this);
      }
    }
    return Builder;
  }
}

export default Subject;

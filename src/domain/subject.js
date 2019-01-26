import { isEmpty } from "lodash";
import { PropertyRequiredException } from "../exceptions";

class Subject {
  constructor(build) {
    this.name = build._name;
    this.code = build._code;
    if (!isEmpty(build._id)) this.id = build._id;
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
          throw new PropertyRequiredException("Subject", "name");
        }
        if (isEmpty(this._code)) {
          throw new PropertyRequiredException("Subject", "code");
        }
        return new Subject(this);
      }
    }
    return Builder;
  }
}

export default Subject;

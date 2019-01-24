import { expect } from "chai";
import Subject from "./subject";

describe("Subject", () => {
  describe("while building", () => {
    const name = "aName";
    const code = "1234";

    it("must have a name", () => {
      expect(() => new Subject.Builder().code(code).build()).to.throw();
    });

    it("must have a code", () => {
      expect(() => new Subject.Builder().name(name).build()).to.throw();
    });

    it("should be ok if it has both: name and code", () => {
      const id = "asd123asd2";
      const subject = new Subject.Builder()
        .name(name)
        .code(code)
        .id(id)
        .build();
      expect(subject.name).to.be.equal(name);
      expect(subject.code).to.be.equal(code);
      expect(subject.id).to.be.equal(id);
    });
  });
});

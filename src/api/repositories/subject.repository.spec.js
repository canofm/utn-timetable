import { expect } from "chai";
import { cleanDb } from "../../test_helpers";
import { SubjectModel } from "../../schemas";
import { SubjectRepository } from "./subject.repository";
import { EntityNotFound } from "../../exceptions";
import * as Promise from "bluebird";

const uuidRandom = "4edd40c86762e0fb12000003";

describe("SubjectRepository", () => {
  beforeEach(async () => await cleanDb());

  describe("get", () => {
    it("should returns subject for the given id", async () => {
      const subject = { name: "aName", code: "aCode" };
      const subjectCreated = await SubjectModel.create(subject);
      const result = await SubjectRepository.get(subjectCreated.id);

      expect(result.name).to.be.eql(subject.name);
      expect(result.code).to.be.eql(subject.code);
    });

    it("should throw not found entity if the given id doesn't exists", done => {
      SubjectRepository.get(uuidRandom).catch(EntityNotFound, () => done());
    });
  });

  describe("getall", () => {
    it("should returns an object with an array of items and a total", async () => {
      const subject1 = { name: "aName1", code: "1" };
      const subject2 = { name: "aName2", code: "2" };
      const subjects = [subject1, subject2];
      const results = await Promise.map(
        subjects,
        async subject => await SubjectModel.create(subject)
      );

      expect(results[0].name).to.be.eql(subject1.name);
      expect(results[0].code).to.be.eql(subject1.code);
      expect(results[1].name).to.be.eql(subject2.name);
      expect(results[1].code).to.be.eql(subject2.code);
    });
  });

  describe("create", () => {});
  describe("update", () => {});
  describe("remove", () => {});
});

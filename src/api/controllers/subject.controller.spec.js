import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as Promise from "bluebird";
import { omit } from "lodash";
import { cleanDb } from "../../test_helpers";
import app from "../../server";
import config from "../../config";
import {
  EntityNotFound,
  SchemaValidationException,
  DuplicatedEntityException
} from "../../exceptions";
import { SubjectRepository } from "../repositories";
import { Subject } from "../../domain";
import { SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME } from "../../schemas/subject.schema";

chai.use(chaiHttp);
const request = () => chai.request(app);
const subjectUri = `${config.api.baseUri}/subject`;
const uuidRandom = "4edd40c86762e0fb12000003";

describe("Subject API", () => {
  beforeEach(async () => await cleanDb());
  describe("GET", () => {
    let subjects;

    beforeEach(async () => {
      subjects = createSubjects(2);
      await Promise.map(subjects, SubjectRepository.create);
    });

    afterEach(() => cleanDb());
    describe("GET /subject", () => {
      it("should get all subjects", async () => {
        const res = await request().get(subjectUri);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        const { items, total } = res.body;
        expect(total).to.be.eql(2);
        expect(items).to.have.lengthOf(2);
        for (let i = 0; i < items.length; i++) {
          expect(items[i].name).to.be.eql(subjects[i].name);
          expect(items[i].code).to.be.eql(subjects[i].code);
        }
      });
    });

    describe("GET /subject/:id", () => {
      it("if should exists should return it with 200 as status code", async () => {
        let subject;
        // since we don't have the ids of any subject, we need to ask for one of them to the getAll endpoint
        const res = await request().get(subjectUri);
        subject = res.body.items[0];
        const innerResponse = await request().get(`${subjectUri}/${subject.id}`);
        expect(innerResponse).to.have.status(200);
        expect(innerResponse).to.be.json;
        expect(innerResponse.body).to.be.eql(subject);
      });

      it("if subject doesn't exists should return 404", async () => {
        const id = 1234;
        const res = await request().get(`${subjectUri}/${id}`);

        const error = JSON.parse(res.error.text);
        const errorExpected = new EntityNotFound("Subject", id).message;
        expect(res).to.have.status(404);
        expect(error.text).to.be.eql(errorExpected.text);
        expect(error.type).to.be.eql(errorExpected.type);
      });
    });
  });

  describe("POST /subject", () => {
    beforeEach(async () => await cleanDb());

    it("when body is correct, it shoulds returns 201 with the entity just created", async () => {
      const [subject] = createSubjects(1);
      const res = await request()
        .post(subjectUri)
        .send(subject);

      expect(res).to.have.status(201);
      expect(res).to.be.json;
      const { body } = res;
      expect(body.name).to.be.eql(subject.name);
      expect(body.code).to.be.eql(subject.code);
      expect(body.id).to.not.be.empty;
    });

    it("when body sent is incomplete, it shoulds return 400", async () => {
      const res = await request()
        .post(subjectUri)
        .send({ code: "12345" });

      expect(res).to.have.status(400);
      const error = JSON.parse(res.error.text);
      const errorExpected = new SchemaValidationException(SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME)
        .message;
      expect(error.type).to.be.eql(errorExpected.type);
    });

    it("when trying to create an already exists subject, it should returns 409", async () => {
      const [subject] = createSubjects(1);
      const subjectThatAlreadyExists = await SubjectRepository.create(subject);
      const res = await request()
        .post(subjectUri)
        .send(omit(subjectThatAlreadyExists, ["id"]));

      expect(res).to.have.status(409);
      const error = res.body;
      const errorExpected = new DuplicatedEntityException().message;
      expect(error.type).to.be.eql(errorExpected.type);
    });
  });

  describe("PUT /subject/:id", () => {
    let subjectThatAlreadyExists;
    beforeEach(async () => {
      const [subject] = createSubjects(1);
      subjectThatAlreadyExists = await SubjectRepository.create(subject);
    });

    afterEach(async () => await cleanDb());

    it("change name to an already exists subject, it should returns 200 and the subject updated", async () => {
      const { id } = subjectThatAlreadyExists;
      const update = { name: "otherName" };
      const res = await request()
        .put(`${subjectUri}/${id}`)
        .send(update);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.name).to.be.eql(update.name);
    });

    it("when trying to update an existing subject but duplicate a unique field, it should returns 409", async () => {
      const otherSubject = new Subject.Builder()
        .name("otherName")
        .code("1qaz")
        .build();
      const otherSubjectDoc = await SubjectRepository.create(otherSubject);
      const { id } = subjectThatAlreadyExists;
      const update = { code: otherSubjectDoc.code };

      const res = await request()
        .put(`${subjectUri}/${id}`)
        .send(update);

      expect(res).to.have.status(409);
      const error = res.body;
      const errorExpected = new DuplicatedEntityException().message;
      expect(error.type).to.be.eql(errorExpected.type);
    });

    it("when try to update a subject that doesn't exists, it should returns 404", async () => {
      const res = await request()
        .put(`${subjectUri}/${uuidRandom}`)
        .send({ name: "someName" });
      expect(res).to.have.status(404);
    });
  });

  describe("DELETE /subject/:id", () => {
    let id;

    beforeEach(async () => {
      const [subject] = createSubjects(1);
      const newSubject = await SubjectRepository.create(subject);
      id = newSubject.id;
    });

    afterEach(async () => await cleanDb());

    it("should remove the subject given and return 204", async () => {
      const res = await request().delete(`${subjectUri}/${id}`);
      expect(res).to.have.status(204);
    });

    it("when trying to remove a subject that doesn't exists should returns 404", async () => {
      const res = await request().delete(`${subjectUri}/${uuidRandom}`);
      expect(res).to.have.status(404);
    });
  });
});

const createSubjects = amount => {
  let subjects = [];
  for (let i = 0; i < amount; i++) {
    const newSubject = new Subject.Builder()
      .name(`aName${i}`)
      .code(i.toString())
      .build();
    subjects.push(newSubject);
  }
  return subjects;
};

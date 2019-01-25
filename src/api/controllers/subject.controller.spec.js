import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as Promise from "bluebird";
import { cleanDb } from "../../test_helpers";
import app from "../../server";
import config from "../../config";
import {
  EntityNotFound,
  SchemaValidatorException,
  SchemaValidationException
} from "../../exceptions";
import { SubjectRepository } from "../repositories";
import { Subject } from "../../domain";
import { SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME } from "../../schemas/subject.schema";

chai.use(chaiHttp);
const request = () => chai.request(app);
const subjectUri = `${config.api.baseUri}/subject/`;

describe("Subject API", () => {
  beforeEach(() => cleanDb());
  describe("GET", () => {
    let subjects;

    beforeEach(done => {
      subjects = createSubjects(2);
      Promise.map(subjects, SubjectRepository.create).then(() => done());
    });

    afterEach(() => cleanDb());
    describe("/subject", () => {
      it("should get all subjects", () => {
        request()
          .get(subjectUri)
          .then(res => {
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
    });

    describe("/subject/:id", () => {
      it("if should exists should return it with 200 as status code", done => {
        let subject;
        // since we don't have the ids of any subject, we need to ask for the to getAll endpoint
        request()
          .get(subjectUri)
          .then(res => (subject = res.body.items[0]))
          .then(() => {
            // here star the test
            request()
              .get(`${subjectUri}${subject.id}`)
              .then(innerRespose => {
                expect(innerRespose).to.have.status(200);
                expect(innerRespose).to.be.json;
                expect(innerRespose.body).to.be.eql(subject);
                done();
              });
          });
      });

      it("if subject doesn't exists should return 404", () => {
        const id = 1234;
        request()
          .get(`${subjectUri}${id}`)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            const errorExpected = new EntityNotFound("Subject", id).message;
            expect(res).to.have.status(404);
            expect(error.text).to.be.eql(errorExpected.text);
            expect(error.type).to.be.eql(errorExpected.type);
          });
      });
    });
  });

  describe("POST /subject", () => {
    it("when body is correct, it shoulds returns 201 with the entity just created", () => {
      const [subject] = createSubjects(1);
      request()
        .post(subjectUri)
        .send(subject)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          const { body } = res;
          expect(body.name).to.be.eql(subject.name);
          expect(body.code).to.be.eql(subject.code);
          expect(body.id).to.not.be.empty;
        });
    });

    it("when body sent is incomplete, it shoulds return 400", () => {
      request()
        .post(subjectUri)
        .send({ code: "12345" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          const error = JSON.parse(res.error.text);
          const errorExpected = new SchemaValidationException(
            SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME
          ).message;
          expect(error.type).to.be.eql(errorExpected.type);
        });
    });
    // case 3: try to create a duplicated
  });

  describe("PUT /subject/:id", () => {
    // case 1: happy
    // case 2: try to duplicated
    // case 3: try to update an entity which doesn't exists
  });

  describe("DELETE /subject/:id", () => {
    let id;

    beforeEach(done => {
      const [subject] = createSubjects(1);
      SubjectRepository.create(subject).then(newSubject => {
        id = newSubject.id;
        done();
      });
    });

    afterEach(() => cleanDb());

    it("should remove the subject given and return 204", done => {
      request()
        .delete(`${subjectUri}${id}`)
        .then(res => {
          expect(res).to.have.status(204);
          done();
        });
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

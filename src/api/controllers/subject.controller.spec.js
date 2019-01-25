import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as Promise from "bluebird";
import { cleanDb } from "../../test_helpers";
import app from "../../server";
import config from "../../config";
import { EntityNotFound } from "../../exceptions";
import { SubjectRepository } from "../repositories";
import { Subject } from "../../domain";

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

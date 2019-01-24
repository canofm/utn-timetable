import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { cleanDb } from "../../test_helpers";
import app from "../../server";
import config from "../../config";
import { EntityNotFound } from "../../exceptions";
import { SubjectRepository } from "../repositories";
import { Subject } from "../../domain";

chai.use(chaiHttp);
const request = () => chai.request(app);

describe("Subject API", () => {
  beforeEach(() => cleanDb());
  describe("GET", () => {
    let subject;

    beforeEach(done => {
      subject = new Subject.Builder()
        .name("aName")
        .code("123456")
        .build();

      SubjectRepository.create(subject).then(() => done());
    });

    afterEach(() => cleanDb());

    it("should get all subjects", () => {
      request()
        .get("/api/v0/subject/")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          // eslint-disable-next-line
          const [elem, _] = res.body.items;
          expect(elem.name).to.be.eql(subject.name);
          expect(elem.code).to.be.eql(subject.code);
        });
    });

    it("if subject doesn't exists should return 404", () => {
      const id = 1234;
      request()
        .get(`${config.api.baseUri}/subject/${id}`)
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

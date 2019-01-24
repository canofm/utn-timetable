import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { cleanDb } from "../../test_helpers";
import app from "../../server";
import config from "../../config";
import { EntityNotFound } from "../../exceptions";

chai.use(chaiHttp);
const request = () => chai.request(app);

describe("Subject API", () => {
  beforeEach(() => {
    cleanDb();
  });

  describe("GET", () => {
    it("should get all subjects", () => {
      request()
        .get("/api/v0/subject/")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.eql([]);
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

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { cleanDb } from "../../test_helpers";
import app from "../../server";

chai.use(chaiHttp);
const request = () => chai.request(app);

describe("Subject API", () => {
  beforeEach(() => {
    cleanDb();
  });
  describe("GET", () => {
    it.only("should get all subjects", () => {
      request()
        .get("/api/v0/subject/")
        .then(result => {
          expect(result).to.have.status(200);
          expect(result).to.be.json;
          expect(result.body).to.be.eql([]);
        });
    });
  });
});

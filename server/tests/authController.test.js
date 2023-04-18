const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = require("../controllers/authController");

describe("Auth Controller", () => {
  describe("login", () => {
    it("should return 500 status code and error message when there's a database error", (done) => {
      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
        },
        db: {
          query: sinon.stub().callsArgWith(2, new Error("Database error")),
        },
      };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(500);
          return {
            json: (data) => {
              expect(data)
                .to.have.property("error")
                .that.equals("Error logging in");
              done();
            },
          };
        },
      };
      authController.login(req, res);
    });

    it("should return 401 status code and error message when user is not found", (done) => {
      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
        },
        db: {
          query: sinon.stub().callsArgWith(2, null, []),
        },
      };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(401);
          return {
            json: (data) => {
              expect(data)
                .to.have.property("error")
                .that.equals("Invalid credentials");
              done();
            },
          };
        },
      };
      authController.login(req, res);
    });

    it("should return 500 status code and error message when there's an error comparing passwords", (done) => {
      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
        },
        db: {
          query: sinon
            .stub()
            .callsArgWith(2, null, [
              { email: "test@test.com", password: "hashedpassword" },
            ]),
        },
      };
      sinon
        .stub(bcrypt, "compare")
        .callsArgWith(2, new Error("Error comparing passwords"));
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(500);
          return {
            json: (data) => {
              expect(data)
                .to.have.property("error")
                .that.equals("Error logging in");
              bcrypt.compare.restore();
              done();
            },
          };
        },
      };
      authController.login(req, res);
    });

    it("should return 401 status code and error message when password is incorrect", (done) => {
      const req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
        },
        db: {
          query: sinon
            .stub()
            .callsArgWith(2, null, [
              { email: "test@test.com", password: "hashedpassword" },
            ]),
        },
      };
      sinon.stub(bcrypt, "compare").callsArgWith(2, null, false);
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(401);
          return {
            json: (data) => {
              expect(data)
                .to.have.property("error")
                .that.equals("Invalid credentials");
              bcrypt.compare.restore();
              done();
            },
          };
        },
      };
      authController.login(req, res);
    });

    it("should return 200 status code, user and token when login is successful", (done) => {
      const user = {
        id: 1,
        email: "test@example.com",
        password: "password123",
      };
      const token = "token123";
      const mockReq = {
        body: { email: "test@example.com", password: "password123" },
        db: {
          query: (query, values, callback) => {
            callback(null, [user]);
          },
        },
      };
      const mockRes = {
        json: (response) => {
          expect(response).to.have.property("user").to.deep.equal(user);
          expect(response).to.have.property("token").to.equal(token);
          expect(mockRes.statusCode).to.equal(200);
          done();
        },
      };

      const bcryptCompareStub = sinon.stub(bcrypt, "compare");
      bcryptCompareStub.callsArgWith(2, null, true);

      const jwtSignStub = sinon.stub(jwt, "sign").returns(token);

      authController.login(mockReq, mockRes);

      // Restore stubbed functions
      bcryptCompareStub.restore();
      jwtSignStub.restore();
    });

    it("should return 401 status code and error message when invalid email is provided", (done) => {
      const mockReq = {
        body: { email: "test@example.com", password: "password123" },
        db: {
          query: (query, values, callback) => {
            callback(null, []);
          },
        },
      };
      const mockRes = {
        status: (statusCode) => {
          expect(statusCode).to.equal(401);
          return {
            json: (response) => {
              expect(response)
                .to.have.property("error")
                .to.equal("Invalid credentials");
              done();
            },
          };
        },
      };
      authController.login(mockReq, mockRes);
    });

    it("should return 500 status code and error message when there is an error with the query", (done) => {
      const mockReq = {
        body: { email: "test@example.com", password: "password123" },
        db: {
          query: (query, values, callback) => {
            callback(new Error("Database error"), null);
          },
        },
      };
      const mockRes = {
        status: (statusCode) => {
          expect(statusCode).to.equal(500);
          return {
            json: (response) => {
              expect(response)
                .to.have.property("error")
                .to.equal("Error logging in");
              done();
            },
          };
        },
      };

      authController.login(mockReq, mockRes);
    });
  });
});

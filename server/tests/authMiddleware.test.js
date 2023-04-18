const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");
const { expect } = require("chai");

describe("authMiddleware", () => {
  let req, res, next, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {
      header: sandbox.stub().returns("Bearer token"),
    };
    res = {
      status: sandbox.stub().returns({
        json: sandbox.spy(),
      }),
    };
    next = sandbox.stub();
    sandbox.stub(jwt, "verify").returns({ id: 1, email: "test@example.com" });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should set the user object on the request and call next when the token is valid", () => {
    authMiddleware(req, res, next);

    expect(req.user).to.deep.equal({ id: 1, email: "test@example.com" });
    expect(next.calledOnce).to.be.true;
  });

  it("should return an error response when the token is missing", () => {
    req.header.returns(null);

    authMiddleware(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.status().json.calledWith({ error: "Unauthorized" })).to.be.true;
  });

  it("should return an error response when the token is invalid", () => {
    jwt.verify.throws(new Error("Invalid token"));

    authMiddleware(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.status().json.calledWith({ error: "Unauthorized" })).to.be.true;
  });
});

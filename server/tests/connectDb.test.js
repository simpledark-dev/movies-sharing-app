const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

const mysql = require("mysql");
const dbConfig = require("../config/db");
const connectDb = require("./connectDb");

describe("connectDb", function () {
  let req, res, next, connection, connectStub;

  beforeEach(function () {
    req = {};
    res = {};
    next = sinon.spy();
    connection = { connect: sinon.spy() };
    connectStub = sinon.stub(mysql, "createConnection").returns(connection);
  });

  afterEach(function () {
    connectStub.restore();
  });

  it("should create a database connection and add it to the request object", function () {
    connectDb(req, res, next);
    expect(connectStub.calledOnce).to.be.true;
    expect(connection.connect.calledOnce).to.be.true;
    expect(req.db).to.equal(connection);
    expect(next.calledOnce).to.be.true;
  });

  it("should call next with an error if there is an error connecting to the database", function () {
    const error = new Error("Connection failed");
    connectStub.callsFake(function () {
      connection.connect = function (callback) {
        callback(error);
      };
      return connection;
    });
    connectDb(req, res, next);
    expect(next.calledWith(error)).to.be.true;
  });
});

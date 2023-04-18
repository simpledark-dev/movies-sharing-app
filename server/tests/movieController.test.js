const sinon = require("sinon");
const { expect } = require("chai");
const movieController = require("../controllers/movieController");

describe("Movie Controller", () => {
  describe("getAllSharedMovies", () => {
    it("should return an array of movies", () => {
      const movies = [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ];

      // Mock the req and res objects
      const req = { db: { query: sinon.stub() } };
      const res = { json: sinon.spy() };

      // Set up the mock behavior for the req.db.query function
      req.db.query.yields(null, movies);

      // Call the function with the mock req and res objects
      movieController.getAllSharedMovies(req, res);

      // Expect that res.json was called with the movies array
      expect(res.json.calledWith(movies)).to.be.true;
    });

    it("should return an error if there is an error getting shared movies", () => {
      const error = "Error getting shared movies";

      // Mock the req and res objects
      const req = { db: { query: sinon.stub() } };
      const res = { status: sinon.stub().returns({ json: sinon.spy() }) };

      // Set up the mock behavior for the req.db.query function
      req.db.query.yields(error, null);

      // Call the function with the mock req and res objects
      movieController.getAllSharedMovies(req, res);

      // Expect that res.status and res.json were called with the error message
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.status().json.calledWith({ error })).to.be.true;
    });
  });
});

const { postMovie } = require("./movieController");

describe("postMovie", () => {
  const mockReq = {
    db: {
      query: jest.fn(),
    },
    body: {
      title: "Test Movie",
      description: "A movie for testing purposes",
      youtubeVideoId: "abc123",
      user: {
        id: 1,
      },
    },
  };

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return error when movie insert query fails", () => {
    const mockErr = new Error("DB connection failed");

    mockReq.db.query.mockImplementation((_, __, cb) => {
      cb(mockErr, null);
    });

    postMovie(mockReq, mockRes);

    expect(mockReq.db.query).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Error adding movie" });
  });

  test("should return error when movies_sharing insert query fails", () => {
    const mockMovieInsertResults = {
      insertId: 1,
    };

    const mockErr = new Error("DB connection failed");

    mockReq.db.query.mockImplementationOnce((_, __, cb) => {
      cb(null, mockMovieInsertResults);
    });

    mockReq.db.query.mockImplementationOnce((_, __, cb) => {
      cb(mockErr, null);
    });

    postMovie(mockReq, mockRes);

    expect(mockReq.db.query).toHaveBeenCalledTimes(2);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Error updating movies sharing",
    });
  });

  test("should return success message when both movie and movies_sharing queries succeed", () => {
    const mockMovieInsertResults = {
      insertId: 1,
    };

    mockReq.db.query.mockImplementationOnce((_, __, cb) => {
      cb(null, mockMovieInsertResults);
    });

    mockReq.db.query.mockImplementationOnce((_, __, cb) => {
      cb(null);
    });

    postMovie(mockReq, mockRes);

    expect(mockReq.db.query).toHaveBeenCalledTimes(2);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Movie added successfully",
      id: mockMovieInsertResults.insertId,
    });
  });
});

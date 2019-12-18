const server = require("../server.js");
const users = require("./users-model.js");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig.js");

describe("user endpoint testing", () => {
  describe("testing insert endpoint", () => {
    it("inserts a new user into the db", done => {
      request(server)
        .post("/api/users")
        .send({
          username: "testuser",
          password: bcrypt.hashSync("testpass", 12)
        })
        .set("Accept", "application/json")
        .expect(201, done);
    });

    beforeEach(async () => {
      await db("users").truncate();
    });
  });

  describe("testing update endpoint", () => {
    it("updates a current user's info in the db", done => {
      request(server)
        .post("/api/users/1")
        .send({
          username: "aaron",
          password: bcrypt.hashSync("strength", 12)
        })
        .set("Accept", "application/json")
        .expect(200, done);
    });
  });

  describe("testing specific user endpoint", () => {
    it("retrieves a specific user from the db", done => {
      request(server)
        .get("/api/users/1")
        .expect(res => {
          res.body.name === "aaron";
        })
        .expect(200, done);
    });
  });

  describe("testing user delete endpoint", () => {
    it("deletes a user from the db", done => {
      request(server)
        .del("/api/users/1")
        .expect(200, done);
    });
  });

  describe("testing general users endpoint", () => {
    it("returns a status of 200 OK", done => {
      request(server)
        .get("/api/users")
        .expect(200, done);
    });
  });
});

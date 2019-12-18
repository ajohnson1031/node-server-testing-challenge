const users = require("./users-model.js");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig.js");

describe("test the users models", () => {
  describe("testing insert method", () => {
    it("inserts new users", async () => {
      let newUser = await users.insert({
        username: "realuser",
        password: bcrypt.hashSync("strength", 12)
      });

      expect(newUser.username).toBe("realuser");
    });

    beforeEach(async () => {
      await db("users").truncate();
    });
  });

  describe("testing get methods", () => {
    it("returns all users", async () => {
      const allUsers = await users.getUsers();
      expect(allUsers).not.toBe(null);
    });

    it("returns a specific user", async () => {
      const thisUser = await users.getById("1");
      expect(thisUser.username).toBe("realuser");
    });
  });

  describe("testing update method", () => {
    it("updates a user", async () => {
      const editedUser = await users.update("1", {
        username: "aaron",
        password: bcrypt.hashSync("strength", 12)
      });
      expect(editedUser.username).toBe("aaron");
    });
  });

  it("removes a user", async () => {
    const removeUser = await users.remove(1);
    const currentUsers = await users.getUsers();
    expect(currentUsers).toHaveLength(0);
  });
});

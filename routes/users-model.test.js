const users = require("./users-model.js");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig.js");

describe("test the users models", () => {
  it("inserts new users", async () => {
    let newUser = await users.insert({
      username: "aaron",
      password: bcrypt.hashSync("strength", 12)
    });

    expect(newUser.username).toBe("aaron");

    let testUser = await users.insert({
      username: "testuser",
      password: bcrypt.hashSync("12345678", 12)
    });

    expect(testUser.username).toBe("testuser");
  });

  it("returns all users", async () => {
    const allUsers = await users.getUsers();
    expect(allUsers).toHaveLength(2);
  });

  it("returns a specific user", async () => {
    const thisUser = await users.getById(1);
    expect(thisUser.username).toBe("aaron");
  });

  it("updates a user", async () => {
    const editedUser = await users.update(2, { username: "realuser" });
    expect(editedUser.username).toBe("realuser");
  });

  it("removes a user", async () => {
    const removeUser = await users.remove(2);
    const currentUsers = await users.getUsers();
    expect(currentUsers).toHaveLength(1);
  });

  beforeEach(async () => {
    await db("users").truncate();
  });
});

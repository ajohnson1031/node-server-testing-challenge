const users = require("./users-model.js");

describe("test the users models", () => {
  it("returns all users", async () => {
    expect(users.getUsers()).toBe(null);
  });
});

const router = require("express").Router();
const users = require("./users-model.js");

router.get("/users", async (req, res) => {
  try {
    const allUsers = await users.getUsers();

    allUsers
      ? res.status(200).json(allUsers)
      : res.status(400).json({ message: "no users found" });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

module.exports = router;

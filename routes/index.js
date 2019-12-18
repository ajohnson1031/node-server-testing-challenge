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

router.get("/users/:id", async (req, res) => {
  try {
    const thisUser = await users.getById(req.params.id);
    thisUser
      ? res.status(200).json(thisUser)
      : res.status(404).json({ message: "User not found." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.post("/users", async (req, res) => {
  try {
    const newUser = await users.insert(req.body);
    newUser
      ? res.status(201).json({ newUser })
      : res.status(400).json({ message: "Sorry, could not insert user." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.post("/users/:id", async (req, res) => {
  try {
    const updateUser = await users.update(req.params.id, req.body);
    updateUser
      ? res.status(200).json(updateUser)
      : res.status(400).json({ message: "Could not update." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await users.remove(id);

    deleteUser && res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

module.exports = router;

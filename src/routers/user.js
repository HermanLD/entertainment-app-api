const { Router } = require("express");
const User = require("../models/user");

const router = Router();

// TODO - Create new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
// TODO - Get user
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) return res.status(404).send();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
// TODO - Update user bookmarks

module.exports = router;

const { Router } = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = Router();

// TODO - Create new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.genAuthTokenAndSave();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});
// TODO - Login user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.loginByCred(req.body.email, req.body.password);

    if (!user) return res.status(404).send();

    const token = await user.genAuthTokenAndSave();

    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});
// TODO - Sign Out user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (e) {}
});
// TODO - Update user bookmarks
router.patch("/users/bookmarks/add", auth, async (req, res) => {
  try {
    const user = await req.user.addBookmarkAndSave(req.body.contentId);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete("/users/bookmarks/delete", auth, async (req, res) => {
  try {
    const user = await req.user.deleteBookmarkAndSave(req.body.contentId);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
// TODO - Log out all tokens

module.exports = router;

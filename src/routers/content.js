const { Router } = require("express");
const Content = require("../models/content");

const router = new Router();

// TODO - Get content
router.get("/content", (req, res) => {
  Content.find({})
    .then((content) => {
      res.status(200).send(content);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});
// TODO - Filter content

module.exports = router;

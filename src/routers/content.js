const { Router } = require("express");
const Content = require("../models/content");
const auth = require("../middleware/auth");

const router = new Router();

// TODO - Get content
router.get("/content", auth, async (req, res) => {
  try {
    // TODO - Filter content
    const content = await Content.find({});
    const publicContent = [];

    let bmObject = {};
    req.user.bookmarks.forEach((bm) => (bmObject[bm.contentId] = 1));

    content.forEach((el) => {
      const elObj = el.toObject();

      if (bmObject[elObj._id]) {
        elObj.isBookmarked = true;
      } else {
        elObj.isBookmarked = false;
      }
      publicContent.push(elObj);
    });

    res.status(200).send(publicContent);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;

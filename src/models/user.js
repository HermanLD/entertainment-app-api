const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer,
  },
  // bookmarkedContent: [{ contentId: { type: String } }],
});

const user = mongoose.model("User", userSchema);

module.exports = user;

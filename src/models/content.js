const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  thumbnail: {
    regular: {
      large: {
        type: String,
        required: true,
      },
      medium: {
        type: String,
        required: true,
      },
      small: {
        type: String,
        required: true,
      },
    },
    trending: {
      large: {
        type: String,
      },
      small: {
        type: String,
      },
    },
  },
});

const content = mongoose.model("Content", contentSchema);

module.exports = content;

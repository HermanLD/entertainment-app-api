const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!isEmail(value))
        throw new Error("Must be a valid email 'example@test.com'");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      const psswrd = value.toLowerCase();
      if (psswrd.includes("password"))
        throw new Error("Password must not contain 'password'");
    },
  },
  // avatar: {
  //   type: Buffer,
  // },
  // bookmarkedContent: [{ contentId: { type: String } }],
});

//? - Before new user is saved
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const user = mongoose.model("User", userSchema);

module.exports = user;

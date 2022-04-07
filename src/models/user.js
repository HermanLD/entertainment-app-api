const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  tokens: [{ token: { type: String, required: true } }],
  bookmarks: [{ contentId: { type: String } }],
  // avatar: {
  //   type: Buffer,
  // },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.methods.addBookmarkAndSave = async function (contentId) {
  const user = this;

  user.bookmarks = user.bookmarks.concat({ contentId });
  await user.save();

  return user;
};

userSchema.methods.deleteBookmarkAndSave = async function (contentId) {
  const user = this;

  user.bookmarks = user.bookmarks.filter((bm) => bm.contentId !== contentId);
  await user.save();

  return user;
};

userSchema.methods.genAuthTokenAndSave = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_SECRET
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.loginByCred = async function (email, password) {
  const user = await this.findOne({ email });
  const isMatched = await bcrypt.compare(password, user.password);

  if (!user || !isMatched) throw new Error("Unable to login");

  return user;
};

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

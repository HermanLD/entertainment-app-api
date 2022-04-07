const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    // TODO - Get client token
    const clientToken = req.header("Authorization").replace("Bearer ", "");
    // TODO - Decode token
    const decodedToken = jwt.verify(clientToken, process.env.TOKEN_SECRET);
    // TODO - Find user w/ decoded id and matching tokens
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": clientToken,
    });

    if (!user) throw new Error();

    req.token = clientToken;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;

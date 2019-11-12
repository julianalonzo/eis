require("dotenv").config("../.env");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function isAuthenticated(req, res, next) {
  const header = req.headers["authorization"];
  if (!Boolean(header)) {
    return res.sendStatus(403);
  }

  const bearer = header.split(" ");
  const token = bearer[1];
  try {
    const jwtDecodedPayload = await jwt.verify(
      token,
      process.env.SECRET_OR_KEY
    );

    const userId = jwtDecodedPayload.id;
    const user = await User.findById(userId);
    if (user) {
      req.body.userId = user.id;
      next();
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    return res.sendStatus(403);
  }
}

module.exports = isAuthenticated;

const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");

/**
 * Creates a new user
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const newUser = new User({
    email: email,
    password: password
  });

  try {
    const hash = await bcrypt.hash(password, 10);
    newUser.password = hash;

    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email
      }
    });
  } catch (err) {
    return res.status(500);
  }
}

module.exports = {
  registerUser
};

require('dotenv').config('../.env');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

const User = require('../models/user');

/**
 * Creates a new user
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} req.body Request body
 * @param {string} req.body.email Email of the user (required)
 * @param {string} req.body.password Password of the user (required)
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

/**
 * Logs a user in
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} req.body Request body
 * @param {string} req.body.email Email of the user (required)
 * @param {string} req.body.password Password of the user (required)
 */
async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const payload = {
        id: user.id
      };

      try {
        // Token is valid for 1 day
        const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
          expiresIn: '7d'
        });

        return res.status(200).json({
          token: `Bearer ${token}`
        });
      } catch (tokenErr) {
        return res.status(500).json({
          status: 500,
          userMessage:
            'There was a problem in generating a token. Please try again.'
        });
      }
    } else {
      return res.status(401).json({
        errors: [{ param: 'password', msg: 'Incorrect password' }]
      });
    }
  } else {
    return res.status(404).json({
      errors: [{ param: 'email', msg: 'User does not exist' }]
    });
  }
}

module.exports = {
  registerUser,
  loginUser
};

const { body } = require("express-validator");

const User = require("../models/user");

/**
 * Validates whether email is valid or password is strong enough
 */
const registerUserValidator = [
  body("email")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async value => {
      const user = await User.findOne({ email: value.trim() });
      if (user !== null) {
        throw new Error(`${value.trim()} already exists`);
      }

      return true;
    })
    .bail()
    .trim(),
  body("password")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail()
];

module.exports = {
  registerUserValidator
};

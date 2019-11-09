const express = require("express");
const router = express.Router();

const {
  registerUserValidator,
  loginUserValidator
} = require("../validator_sanitizer/user");

const usersController = require("../controllers/user");

/**
 * POST /api/users/register
 * Creates a new user
 */
router.post("/register", registerUserValidator, usersController.registerUser);

/**
 * POST /api/users/login
 * Logs a user in
 */
router.post("/login", loginUserValidator, usersController.loginUser);

module.exports = router;

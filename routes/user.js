const express = require("express");
const router = express.Router();

const { registerUserValidator } = require("../validator_sanitizer/user");

const usersController = require("../controllers/user");

/**
 * POST /api/users/register
 */
router.post("/register", registerUserValidator, usersController.registerUser);

module.exports = router;

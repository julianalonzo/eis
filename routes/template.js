const express = require('express');
const router = express.Router();

const templateController = require('../controllers/template');

router.post('/new', templateController.createTemplate);

module.exports = router;

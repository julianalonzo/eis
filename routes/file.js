const express = require('express');
const router = express.Router();

const filesController = require('../controllers/file');

router.get('/:filename', filesController.getFile);

module.exports = router;

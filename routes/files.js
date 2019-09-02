const express = require('express');
const router = express.Router();

const filesController = require('../controllers/files');

router.get('/:filename', filesController.getFile);

module.exports = router;

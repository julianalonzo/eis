const express = require('express');
const router = express.Router();

const foldersController = require('../controllers/folder');

router.get('/', foldersController.getFolders);

router.post('/new', foldersController.createFolder);

module.exports = router;

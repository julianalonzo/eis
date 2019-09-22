const express = require('express');
const router = express.Router();

const foldersController = require('../controllers/folder');

router.get('/folder-hierarchy', foldersController.getFolderHierarchy);

router.get('/', foldersController.getFolders);

router.post('/new', foldersController.createFolder);

module.exports = router;

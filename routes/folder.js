const express = require('express');
const router = express.Router();

const foldersController = require('../controllers/folder');

router.get('/', foldersController.getFolders);

router.get('/:folderId/hierarchy', foldersController.getFolderHierarchy);

router.post('/', foldersController.createFolder);

router.delete('/:folderId', foldersController.removeFolder);

module.exports = router;

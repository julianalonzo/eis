const express = require('express');
const router = express.Router();

const foldersController = require('../controllers/folder');

router.get('/', foldersController.getFolders);

router.get('/:folderId', foldersController.getFolder);

router.post('/', foldersController.createFolder);

router.post('/:folderId', foldersController.createFolder);

router.delete('/:folderId', foldersController.removeFolder);

module.exports = router;

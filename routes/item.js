const express = require('express');
const router = express.Router();

const upload = require('../util/fileStorage');

const itemController = require('../controllers/item');

router.get('/', itemController.getItems);

const createItemsUpload = upload.fields([
  { name: 'fileThumbnails' },
  { name: 'fileAttachments' }
]);
router.post('/new', createItemsUpload, itemController.createItems);

module.exports = router;

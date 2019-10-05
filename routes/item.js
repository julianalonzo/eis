const express = require('express');
const router = express.Router();

const upload = require('../util/fileStorage');

const itemController = require('../controllers/item');

router.get('/', itemController.getItems);

router.get('/:itemId', itemController.getItem);

const createItemsUpload = upload.fields([
  { name: 'fileThumbnails' },
  { name: 'fileAttachments' }
]);
router.post('/new', createItemsUpload, itemController.createItems);

router.post('/remove', itemController.removeItem);

module.exports = router;

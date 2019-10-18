const express = require('express');
const router = express.Router();

const upload = require('../util/fileStorage');

const itemController = require('../controllers/item');

router.get('/', itemController.getItems);

router.get('/:itemId', itemController.getItem);

router.post(
  '/',
  upload.fields([{ name: 'fileThumbnails' }, { name: 'fileAttachments' }]),
  itemController.createItems
);

router.put(
  '/:itemId',
  upload.fields([{ name: 'fileThumbnails' }, { name: 'fileAttachments' }]),
  itemController.updateItem
);

router.delete('/:itemId', itemController.removeItem);

module.exports = router;

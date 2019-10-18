const express = require('express');
const router = express.Router();
const upload = require('../util/fileStorage');

const filesController = require('../controllers/file');

router.post(
  '/thumbnails',
  upload.array('thumbnails'),
  filesController.createThumbnails
);

router.post(
  '/attachments',
  upload.array('attachments'),
  filesController.createAttachments
);

router.get('/:filename', filesController.getFile);

module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require('../util/fileStorage');

const filesController = require('../controllers/files');

const createThumbnailsUpload = upload.array('thumbnails');
router.post(
  '/new-thumbnails',
  createThumbnailsUpload,
  filesController.createThumbnails
);

const createAttachmentsUpload = upload.array('attachments');
router.post(
  '/new-attachments',
  createAttachmentsUpload,
  filesController.createAttachments
);

router.get('/:filename', filesController.getFile);

module.exports = router;

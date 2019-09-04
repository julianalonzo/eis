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

router.get('/:filename', filesController.getFile);

module.exports = router;

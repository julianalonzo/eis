const express = require('express');
const router = express.Router();
const upload = require('../util/fileStorage');

const templateController = require('../controllers/template');

router.get('/', templateController.getTemplates);

router.get('/:templateId', templateController.getTemplate);

router.post(
  '/',
  upload.fields([{ name: 'fileThumbnails' }, { name: 'fileAttachments' }]),
  templateController.createTemplate
);

router.put(
  '/:templateId',
  upload.fields([{ name: 'fileThumbnails' }, { name: 'fileAttachments' }]),
  templateController.updateTemplate
);

router.delete('/:templateId', templateController.removeTemplate);

module.exports = router;

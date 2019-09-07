const express = require('express');
const router = express.Router();
const upload = require('../util/fileStorage');

const templateController = require('../controllers/template');

router.get('/', templateController.getTemplates);

const createTemplateUpload = upload.fields([
  { name: 'thumbnails' },
  { name: 'attachments' }
]);
router.post('/new', createTemplateUpload, templateController.createTemplate);

router.get('/:templateId', templateController.getTemplate);

module.exports = router;

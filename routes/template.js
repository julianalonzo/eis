const express = require("express");
const router = express.Router();

const isAuthenticated = require("../auth/isAuthenticated");

const upload = require("../util/fileStorage");

const {
  getTemplatesValidator,
  getTemplateValidator,
  createTemplateValidator,
  updateTemplateValidator,
  deleteTemplateValidator
} = require("../validator_sanitizer/template");

const templateController = require("../controllers/template");

/**
 * GET /api/templates
 * Gets all shown or searched/filtered templates
 */
router.get(
  "/",
  isAuthenticated,
  getTemplatesValidator,
  templateController.getTemplates
);

/**
 * GET /api/templates/{templateId}
 * Gets a template based on the id provided
 */
router.get(
  "/:templateId",
  isAuthenticated,
  getTemplateValidator,
  templateController.getTemplate
);

/**
 * POST /api/templates
 * Creates a new template
 */
router.post(
  "/",
  upload.fields([
    { name: "newThumbnails", maxCount: 3 },
    { name: "newAttachments", maxCount: 10 }
  ]),
  isAuthenticated,
  createTemplateValidator,
  templateController.createTemplate
);

/**
 * PUT /api/templates/{templateId}
 * Updates an existing template
 */
router.put(
  "/:templateId",
  upload.fields([
    { name: "newThumbnails", maxCount: 3 },
    { name: "newAttachments", maxCount: 10 }
  ]),
  isAuthenticated,
  updateTemplateValidator,
  templateController.updateTemplate
);

/**
 * DELETE /api/templates/{templateId}
 * Permanently deletes a template
 */
router.delete(
  "/:templateId",
  isAuthenticated,
  deleteTemplateValidator,
  templateController.deleteTemplate
);

module.exports = router;

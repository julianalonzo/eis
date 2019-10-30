const express = require('express');
const router = express.Router();

const {
  getFoldersValidator,
  getFolderValidator,
  createFolderValidator,
  updateFolderValidator,
  deleteFolderValidator
} = require('../validators/folder');

const foldersController = require('../controllers/folder');

/**
 * GET /api/folders
 * Gets all shown or searched/filtered folders in the collection
 */
router.get('/', getFoldersValidator, foldersController.getFolders);

/**
 * GET /api/folders/{folderId}
 * Gets a folder based on the id provided
 */
router.get('/:folderId', getFolderValidator, foldersController.getFolder);

/**
 * GET /api/folders/{folderId}/items
 * Gets items of a folder based on the folder id provided
 */
router.get(
  '/:folderId/items',
  getFolderValidator,
  foldersController.getFolderItems
);

/**
 * POST /api/folders
 * Creates a new folder
 */
router.post('/', createFolderValidator, foldersController.createFolder);

/**
 * PUT /api/folders
 * Updates a folder
 */
router.put('/:folderId', updateFolderValidator, foldersController.updateFolder);

/**
 * DELETE /api/folders
 * Permanently deletes a folder
 */
router.delete(
  '/:folderId',
  deleteFolderValidator,
  foldersController.deleteFolder
);

module.exports = router;

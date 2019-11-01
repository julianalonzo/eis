const express = require('express');
const router = express.Router();

const upload = require('../util/fileStorage');

const {
  getItemsValidator,
  getItemValidator,
  createItemValidator,
  updateItemValidator,
  deleteItemValidator
} = require('../validator_sanitizer/item');

const itemController = require('../controllers/item');

/**
 * GET /api/items
 * Gets all shown or searched/filtered items in the collection
 */
router.get('/', getItemsValidator, itemController.getItems);

/**
 * GET /api/items/{itemId}
 * Gets an item based on the id provided
 */
router.get('/:itemId', getItemValidator, itemController.getItem);

/**
 * POST /api/items
 * Creates a new item
 */
router.post(
  '/',
  upload.fields([
    { name: 'newThumbnails', maxCount: 3 },
    { name: 'newAttachments', maxCount: 10 }
  ]),
  createItemValidator,
  itemController.createItem
);

/**
 * PUT /api/items/{itemId}
 * Updates an existing item
 */
router.put(
  '/:itemId',
  upload.fields([
    { name: 'newThumbnails', maxCount: 3 },
    { name: 'newAttachments', maxCount: 10 }
  ]),
  updateItemValidator,
  itemController.updateItem
);

/**
 * DELETE /api/items/${itemId}
 * Permanently deletes an item
 */
router.delete('/:itemId', deleteItemValidator, itemController.deleteItem);

module.exports = router;

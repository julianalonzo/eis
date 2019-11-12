const express = require("express");
const router = express.Router();

const isAuthenticated = require("../auth/isAuthenticated");

const upload = require("../util/fileStorage");

const {
  getItemsValidator,
  getItemValidator,
  createItemValidator,
  updateItemValidator,
  deleteItemValidator
} = require("../validator_sanitizer/item");

const itemController = require("../controllers/item");

/**
 * GET /api/items
 * Gets all shown or searched/filtered items in the collection
 */
router.get("/", isAuthenticated, getItemsValidator, itemController.getItems);

/**
 * GET /api/items/{itemId}
 * Gets an item based on the id provided
 */
router.get(
  "/:itemId",
  isAuthenticated,
  getItemValidator,
  itemController.getItem
);

/**
 * POST /api/items
 * Creates a new item
 */
router.post(
  "/",
  upload.fields([
    { name: "newThumbnails", maxCount: 3 },
    { name: "newAttachments", maxCount: 10 }
  ]),
  isAuthenticated,
  createItemValidator,
  itemController.createItem
);

/**
 * PUT /api/items/{itemId}
 * Updates an existing item
 */
router.put(
  "/:itemId",
  upload.fields([
    { name: "newThumbnails", maxCount: 3 },
    { name: "newAttachments", maxCount: 10 }
  ]),
  isAuthenticated,
  updateItemValidator,
  itemController.updateItem
);

/**
 * DELETE /api/items/${itemId}
 * Permanently deletes an item
 */
router.delete(
  "/:itemId",
  isAuthenticated,
  deleteItemValidator,
  itemController.deleteItem
);

module.exports = router;

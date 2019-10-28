const { validationResult } = require('express-validator');

const { saveFiles } = require('./file');
const { getFolderHierarchy } = require('./folder');

const Item = require('../models/item');

/**
 * Gets all shown or searched/filtered items in the collection
 * @param {Object} req Request object
 * @param {Object} req.query Request queries
 * @param {string} req.query.search Request query parameter for full-text search
 * @param {Object} res Response object
 */
async function getItems(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let items = [];

  const searchQuery = req.query.search || '';
  if (Boolean(searchQuery)) {
    items = await Item.find(
      {
        $text: { $search: searchQuery },
        isTemplate: false,
        shown: true
      },
      {
        score: { $meta: 'textScore' }
      }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('thumbnails')
      .populate('attachments')
      .exec();
  } else {
    items = await Item.find({ ...req.query, isTemplate: false, shown: true })
      .populate('thumbnails')
      .populate('attachments')
      .exec();
  }

  for (let i = 0; i < items.length; i++) {
    const folderHierarchy = await getFolderHierarchy(items[i].folder);

    items[i] = {
      ...items[i]._doc,
      folderHierarchy: folderHierarchy
    };
  }

  if (items.length === 0) {
    return res.status(404).json({ items: [] });
  }

  return res.status(200).json({ items: items });
}

/**
 * Gets an item based on the id provided
 * @param {Object} req Request object
 * @param {Object} req.params Request parameters
 * @param {mongoose.SchemaTypes.ObjectId} req.params.itemId ID of the item to be fetched (required)
 * @param {Object} res Response object
 */
async function getItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const itemId = req.params.itemId;
  const item = await Item.findOne({
    _id: itemId,
    isTemplate: false,
    shown: true
  })
    .populate('thumbnails')
    .populate('attachments')
    .exec();

  if (Boolean(item)) {
    const folderHierarchy = await getFolderHierarchy(item.folder);

    return res.status(200).json({
      item: {
        ...item._doc,
        folderHierarchy: folderHierarchy
      }
    });
  } else {
    return res.status(404).json({
      item: null,
      error: { status: 404, userMessage: 'Item does not exist' }
    });
  }
}

/**
 * Creates a new item
 * @param {Object} req Request object
 * @param {Object} req.body Request body
 * @param {Object} req.body.item Item to be added
 * @param {string} req.body.item.name Name of the item (required)
 * @param {string} req.body.item.category Category of the item
 * @param {string} req.body.item.condition Condition of the item
 * @param {mongoose.SchemaTypes.ObjectId[]} req.body.item.thumbnails Thumbnail IDs of an item
 * @param {Object[]} req.body.item.properties Properties of an item
 * @param {string} req.body.item.properties[].name Name of the property (required)
 * @param {string} req.body.item.properties[].value Value of the property
 * @param {mongoose.SchemaTypes.ObjectId[]} req.body.item.attachments Attachment IDs of an item
 * @param {mongoose.SchemaTypes.ObjectId} req.body.item.folder Folder ID that represents where the item is located
 * @param {Object} req.files Request files (handled by multer)
 * @param {File[]} req.files.newThumbnails Newly uploaded thumbnails for the item
 * @param {File[]} req.files.newAttachments Newly uploaded attachments for the item
 * @param {Object} res Response object
 */
async function createItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    name,
    category,
    condition,
    properties,
    thumbnails,
    attachments,
    folder
  } = req.body.item;

  const { newThumbnails, newAttachments } = req.files;

  const newThumbnailsIds = await saveFiles('thumbnail', newThumbnails || []);
  const newAttachmentsIds = await saveFiles('attachment', newAttachments || []);

  const savedItem = await new Item({
    name: name,
    category: category,
    condition: condition,
    thumbnails: thumbnails.concat(newThumbnailsIds),
    properties: properties,
    attachments: attachments.concat(newAttachmentsIds),
    notes: [],
    folder: folder
  }).save();

  const item = await savedItem
    .populate('thumbnails')
    .populate('attachments')
    .execPopulate();

  const folderHierarchy = await getFolderHierarchy(item.folder);

  return res
    .status(201)
    .json({ item: { ...item._doc, folderHierarchy: folderHierarchy } });
}

/**
 * Updates an existing item
 * @param {Object} req Request object
 * @param {Object} req.body Request body
 * @param {Object} req.body.item Item to be updated
 * @param {string} req.body.item.name Name of the item
 * @param {string} req.body.item.category Category of the item
 * @param {string} req.body.item.condition Condition of the item
 * @param {mongoose.SchemaTypes.ObjectId[]} req.body.item.thumbnails Thumbnail IDs of an item
 * @param {Object[]} req.body.item.properties Properties of an item
 * @param {string} req.body.item.properties[].name Name of the property
 * @param {string} req.body.item.properties[].value Value of the property
 * @param {mongoose.SchemaTypes.ObjectId[]} req.body.item.attachments Attachment IDs of an item
 * @param {mongoose.SchemaTypes.ObjectId} req.body.item.folder Folder ID that represents where the item is located
 * @param {Object} req.files Request files (handled by multer)
 * @param {File[]} req.files.newThumbnails Newly uploaded thumbnails for the item
 * @param {File[]} req.files.newAttachments Newly uploaded attachments for the item
 * @param {Object} res Response object
 */
async function updateItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const itemId = req.params.itemId;

  const item = await Item.findById(itemId);

  if (item !== null) {
    let newThumbnailsIds;
    let newAttachmentsIds;
    if (req.files) {
      const { newThumbnails, newAttachments } = req.files;

      newThumbnailsIds = newThumbnails
        ? await saveFiles('thumbnail', newThumbnails)
        : undefined;
      newAttachmentsIds = newAttachments
        ? await saveFiles('attachment', newAttachments)
        : undefined;
    }

    await Item.updateOne(
      { _id: itemId },
      {
        $set: {
          _id: itemId,
          ...req.body.item
        }
      },
      { omitUndefined: true }
    );

    await Item.updateOne(
      { _id: itemId },
      {
        $addToSet: {
          thumbnails: newThumbnailsIds,
          attachments: newAttachmentsIds
        }
      },
      { omitUndefined: true }
    );

    const updatedItem = await Item.findById(itemId)
      .populate('thumbnails')
      .populate('attachments')
      .exec();

    const folderHierarchy = await getFolderHierarchy(item.folder);

    return res.status(200).json({
      item: {
        ...updatedItem._doc,
        folderHierarchy: folderHierarchy
      }
    });
  } else {
    return res.status(404).json({
      item: null,
      error: { status: 404, userMessage: 'Item does not exist' }
    });
  }
}

/**
 * Permanently deletes the item
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} req.params Request parameters
 * @param {Object} req.params.itemId ID of the item to be deleted
 */
async function deleteItem(req, res) {
  const itemId = req.params.itemId;

  const deletedItem = await Item.findOneAndDelete({
    _id: itemId,
    isTemplate: false
  });

  if (deletedItem === null) {
    return res.status(404).json({
      itemId: null,
      error: {
        status: 404,
        userMessage: 'Item does not exist'
      }
    });
  }

  const folderHierarchy = await getFolderHierarchy(deletedItem.folder);

  return res
    .status(204)
    .json({ itemId: deletedItem.id, folderHierarchy: folderHierarchy });
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};

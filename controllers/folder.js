const { validationResult } = require('express-validator');

const Item = require('../models/item');
const Folder = require('../models/folder');

/**
 * Gets all shown or searched/filtered folders in the collection
 * @param {Object} req Request object
 * @param {Object} req.query Request queries
 * @param {string} req.query.search Request query parameter for full-text search
 * @param {Object} res Response object
 */
async function getFolders(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { userId } = req.body;
  let folders = [];

  const searchQuery = req.query.search || '';
  if (Boolean(searchQuery)) {
    folders = await Folder.find(
      {
        $text: { $search: searchQuery },
        shown: true,
        user: userId
      },
      {
        score: { $meta: 'textScore' }
      }
    ).sort({ score: { $meta: 'textScore' } });
  } else {
    folders = await Folder.find({ ...req.query, shown: true, user: userId });
  }

  let foldersWithHierarchy = [];
  for (const folder of folders) {
    const hierarchy = await getFolderHierarchy(folder.id);
    foldersWithHierarchy = foldersWithHierarchy.concat({
      ...folder._doc,
      hierarchy: hierarchy
    });
  }

  return res.status(200).json({ folders: foldersWithHierarchy });
}

/**
 * Gets a folder based on the id provided
 * @param {Object} req Request object
 * @param {Object} req.params Request parameters
 * @param {mongoose.SchemaTypes.ObjectId} req.params.folderId ID of the folder to be fetched (required)
 * @param {Object} res Response object
 */
async function getFolder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { folderId } = req.params;
  const { userId } = req.body;

  const folder = await Folder.findOne({
    _id: folderId,
    shown: true,
    user: userId
  });
  if (folder === null) {
    return res.status(404).json({
      folder: null,
      error: {
        status: 404,
        userMessage: 'Folder does not exist'
      }
    });
  }

  const children = await findChildren(folderId);
  const folderHierarchy = await getFolderHierarchy(folderId);

  return res.status(200).json({
    folder: {
      ...folder._doc,
      children: children,
      hierarchy: folderHierarchy
    }
  });
}

/**
 * Gets folder items based on the folder id provided
 * @param {Object} req Request object
 * @param {Object} req.params Request parameters
 * @param {mongoose.SchemaTypes.ObjectId} req.params.folderId ID of the folder to be fetched (required)
 * @param {Object} res Response object
 */
async function getFolderItems(req, res) {
  const { folderId } = req.params;
  const { userId } = req.body;

  const folder = await Folder.findOne({
    _id: folderId,
    shown: true,
    user: userId
  });
  if (folder === null) {
    return res.status(404).json({
      folder: null,
      items: [],
      error: {
        status: 404,
        userMessage: 'Folder does not exist'
      }
    });
  }

  const children = await findChildren(folderId);
  const folderHierarchy = await getFolderHierarchy(folderId);
  const items = await Item.find({ folder: folderId })
    .populate('thumbnails')
    .populate('attachments')
    .exec();

  return res.status(200).json({
    folder: {
      ...folder._doc,
      children: children,
      hierarchy: folderHierarchy,
      items: items
    }
  });
}

/**
 * Creates a new folder
 * @param {Object} req Request object
 * @param {Object} req.body Request body
 * @param {string} req.body.name Name of the folder (required)
 * @param {mongoose.SchemaTypes.ObjectId} req.body.parent ID of the parent
 * @param {Object} res Response object
 */
async function createFolder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, parent, userId } = req.body;

  const folder = await new Folder({
    name: name,
    parent: Boolean(parent) ? parent : null,
    shown: true,
    user: userId
  }).save();

  const children = await findChildren(folder.id);
  const folderHierarchy = await getFolderHierarchy(folder.id);

  return res.status(201).json({
    folder: {
      ...folder._doc,
      children: children,
      hierarchy: folderHierarchy
    }
  });
}

/**
 * Updates a folder
 * @param {Object} req Request object
 * @param {Object} req.params Request parameters
 * @param {mongoose.SchemaTypes.ObjectId} req.params.folderId ID of the folder to be updated (required)
 * @param {Object} req.body Request body
 * @param {string} req.body.name Name of the folder
 * @param {mongoose.SchemaTypes.ObjectId} req.body.parent ID of the parent
 * @param {Object} res Response object
 */
async function updateFolder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { folderId } = req.params;
  const { name, parent, userId } = req.body;

  const updatedFolder = await Folder.findOneAndUpdate(
    { _id: folderId, user: userId },
    { $set: { name: name, parent: Boolean(parent) ? parent : null } },
    { new: true, omitUndefined: true, useFindAndModify: false }
  );

  if (updatedFolder === null) {
    return res.status(404).json({
      folder: null,
      error: {
        status: 404,
        userMessage: 'Folder does not exist'
      }
    });
  }

  const children = await findChildren(folderId);
  const folderHierarchy = await getFolderHierarchy(folderId);

  return res.status(200).json({
    folder: {
      ...updatedFolder._doc,
      children: children,
      hierarchy: folderHierarchy
    }
  });
}

/**
 * Permanently deletes a folder and all of its children and items
 * @param {Object} req Request object
 * @param {Object} req.params Request parameters
 * @param {mongoose.SchemaTypes.ObjectId} req.params.folderId ID of the folder to be deleted (required)
 * @param {Object} res Response object
 */
async function deleteFolder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const folderId = req.params.folderId;
  const { userId } = req.body;

  const folder = await Folder.findOne({ _id: folderId, user: userId });
  if (folder === null) {
    return res.status(404).json({
      deletedFoldersIds: [],
      deletedItemsIds: [],
      error: {
        status: 404,
        userMessage: 'Folder does not exist'
      }
    });
  }

  const folderChildren = await findDescendants(folderId);

  let deletedFoldersIds = [];
  let deletedItemsIds = [];
  for (const folderChild of folderChildren) {
    const clearedFolder = await clearFolder(folderChild.id);

    deletedFoldersIds = deletedFoldersIds.concat(clearedFolder.folderId);
    deletedItemsIds = deletedItemsIds.concat(clearedFolder.items);
  }

  const clearedParentFolder = await clearFolder(folderId);
  deletedFoldersIds = deletedFoldersIds.concat(clearedParentFolder.folderId);
  deletedItemsIds = deletedItemsIds.concat(clearedParentFolder.items);

  return res.status(200).json({
    deletedFoldersIds: deletedFoldersIds,
    deletedItemsIds: deletedItemsIds
  });
}

/**
 * Finds children of a folder
 * @param {mongoose.SchemaTypes.ObjectId} folderId ID of the parent folder
 */
async function findChildren(folderId) {
  const immediateChildren = await Folder.find({
    parent: folderId,
    shown: true
  });

  return immediateChildren;
}

/**
 * Generates the folder hierarchy (all parent folders) of a folder
 * @param {mongoose.SchemaTypes.ObjectId} folderId ID of the last folder
 */
async function getFolderHierarchy(folderId) {
  const folderHierarchy = [];

  let currentFolder = await Folder.findById(folderId);
  let isFolderHierarchyComplete = currentFolder.parent === null;

  // Push the first folder to the folder heirarchy
  folderHierarchy.push(currentFolder);

  while (!isFolderHierarchyComplete) {
    const parentFolder = await Folder.findById(currentFolder.parent);
    folderHierarchy.push(parentFolder);

    if (parentFolder.parent !== null) {
      currentFolder = parentFolder;
    } else {
      isFolderHierarchyComplete = true;
    }
  }

  return folderHierarchy.reverse();
}

/**
 * Finds all descendants of a folder
 * @param {mongoose.SchemaTypes.ObjectId} folderId ID of the folder (required)
 * @returns All folder descendants
 */
async function findDescendants(folderId) {
  let children = await Folder.find({ parent: folderId });

  for (const childFolder of children) {
    const childrenOfChildFolder = await findDescendants(childFolder.id);

    children = children.concat(childrenOfChildFolder);
  }

  return children;
}

/**
 * Deletes the folder and all items in that folder
 * @param {mongoose.SchemaTypes.ObjectId} folderId ID of the folder to be cleared (required)
 * @returns IDs of all deleted folders and items
 */
async function clearFolder(folderId) {
  await Folder.deleteOne({ _id: folderId });

  const deletedItems = await deleteItemsByFolderId(folderId);

  return {
    folderId: folderId,
    items: deletedItems
  };
}

/**
 * Deletes all items of a folder
 * @param {mongoose.SchemaTypes.ObjectId} folderId ID of the folder
 * @returns IDs of all deleted items
 */
async function deleteItemsByFolderId(folderId) {
  const items = await Item.find({ folder: folderId });

  await Item.deleteMany({ folder: folderId });

  return items.map(item => item.id);
}

module.exports = {
  getFolders,
  getFolder,
  getFolderItems,
  getFolderHierarchy,
  createFolder,
  updateFolder,
  deleteFolder
};

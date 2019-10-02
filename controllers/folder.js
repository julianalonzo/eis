const Folder = require('../models/folder');

const { removeItemsByFolderId } = require('./item');

exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find({ shown: true });

    res.status(200).json({ folders: folders });
  } catch (err) {
    console.log(err);
  }
};

exports.getFolderHierarchy = async (req, res, next) => {
  const folderHierarchy = [];

  // Push the first folder (i.e., in the request body) to the folder heirarchy
  folderHierarchy.push(await Folder.findById(req.body.folderId));

  let isFolderHierarchyComplete = false;
  let currentFolderId = req.body.folderId;

  while (!isFolderHierarchyComplete) {
    const parentFolder = await this.findParent(currentFolderId);

    if (parentFolder !== null) {
      folderHierarchy.push(parentFolder);
      currentFolderId = parentFolder.id;
    } else {
      isFolderHierarchyComplete = true;
    }
  }

  res.status(200).json({ folderHierarchy: folderHierarchy.reverse() });
};

exports.findParent = async folderId => {
  const folder = await Folder.findById(folderId);
  const folderParent = (await Folder.findById(folder.parent)) || null;

  return folderParent;
};

exports.createFolder = async (req, res, next) => {
  try {
    const folderName = req.body.name || '';
    const folderParent = req.body.parent || null;

    const folder = new Folder({
      name: folderName,
      parent: folderParent,
      shown: true
    });
    const createdFolder = await folder.save();

    res.status(201).json({ folder: createdFolder });
  } catch (err) {
    console.log(err);
  }
};

exports.removeFolder = async (req, res, next) => {
  const folderId = req.body.folderId;

  try {
    if (folderId) {
      const folderChildren = await this.findChildren(folderId);

      let removedFoldersIds = [];
      let removedItemsIds = [];
      for (const folderChild of folderChildren) {
        const clearedFolder = await this.clearFolder(folderChild.id);

        removedFoldersIds = removedFoldersIds.concat(clearedFolder.folderId);
        removedItemsIds = removedItemsIds.concat(clearedFolder.removedItems);
      }

      const clearedParentFolder = await this.clearFolder(folderId);
      removedFoldersIds = removedFoldersIds.concat(
        clearedParentFolder.folderId
      );
      removedItemsIds = removedItemsIds.concat(
        clearedParentFolder.removedItems
      );

      res.status(200).json({
        removedFoldersIds: removedFoldersIds,
        removedItemsIds: removedItemsIds
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.clearFolder = async folderId => {
  await Folder.updateOne(
    { _id: folderId, shown: true },
    { $set: { shown: false } }
  );

  const removedItems = await removeItemsByFolderId(folderId);

  return {
    folderId: folderId,
    removedItems: removedItems
  };
};

exports.findChildren = async folderId => {
  let children = await Folder.find({ parent: folderId, shown: true });

  for (const childFolder of children) {
    const childrenOfChildFolder = await this.findChildren(childFolder.id);

    children = children.concat(childrenOfChildFolder);
  }

  return children;
};

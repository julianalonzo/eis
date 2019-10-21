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

exports.getFolder = async (req, res, next) => {
  try {
    const { folderId } = req.params;

    const currentFolder = await Folder.findById(folderId);
    const children = await this.findChildren(folderId);
    const folderHierarchy = await this.getFolderHierarchy(folderId);

    res.status(200).json({
      folder: {
        _id: currentFolder._id,
        name: currentFolder.name,
        parent: currentFolder.parent,
        children: children,
        hierarchy: folderHierarchy
      }
    });
  } catch (err) {
    console.log(err);
  }
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
  const folderId = req.params.folderId;

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

exports.getFolderHierarchy = async folderId => {
  const folderHierarchy = [];

  // Push the first folder (i.e., in the request body) to the folder heirarchy
  folderHierarchy.push(await Folder.findById(folderId).select('-parent'));

  let isFolderHierarchyComplete = false;
  let currentFolderId = folderId;

  while (!isFolderHierarchyComplete) {
    const parentFolder = await this.findParent(currentFolderId);

    if (parentFolder !== null) {
      folderHierarchy.push(parentFolder);
      currentFolderId = parentFolder.id;
    } else {
      isFolderHierarchyComplete = true;
    }
  }

  return folderHierarchy.reverse();
};

exports.findParent = async folderId => {
  const folder = await Folder.findById(folderId);
  const folderParent =
    (await Folder.findById(folder.parent).select('-parent')) || null;

  return folderParent;
};

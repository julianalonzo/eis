const Item = require('../models/item');
const Folder = require('../models/folder');

async function getFolders(req, res, next) {
  try {
    const folders = await Folder.find({ shown: true });

    res.status(200).json({ folders: folders });
  } catch (err) {
    console.log(err);
  }
}

async function getFolder(req, res, next) {
  try {
    const { folderId } = req.params;

    const currentFolder = await Folder.findById(folderId);
    const children = await findImmediateChildren(folderId);
    const folderHierarchy = await getFolderHierarchy(folderId);

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
}

async function createFolder(req, res, next) {
  try {
    const folderParent = req.params.folderId || null;
    const folderName = req.body.name || '';

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
}

async function removeFolder(req, res, next) {
  const folderId = req.params.folderId;

  try {
    if (folderId) {
      const folderChildren = await findAllChildren(folderId);

      let removedFoldersIds = [];
      let removedItemsIds = [];
      for (const folderChild of folderChildren) {
        const clearedFolder = await clearFolder(folderChild.id);

        removedFoldersIds = removedFoldersIds.concat(clearedFolder.folderId);
        removedItemsIds = removedItemsIds.concat(clearedFolder.removedItems);
      }

      const clearedParentFolder = await clearFolder(folderId);
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
}

async function clearFolder(folderId) {
  await Folder.updateOne(
    { _id: folderId, shown: true },
    { $set: { shown: false } }
  );

  const removedItems = await removeItemsByFolderId(folderId);

  return {
    folderId: folderId,
    removedItems: removedItems
  };
}

async function removeItemsByFolderId(folderId) {
  const folderItems = await Item.find({ folder: folderId, shown: true });

  await Item.updateMany(
    { folder: folderId, shown: true },
    { $set: { shown: false } }
  );

  return folderItems.map(item => item.id);
}

async function findImmediateChildren(folderId) {
  const immediateChildren = await Folder.find({
    parent: folderId,
    shown: true
  });

  return immediateChildren;
}

async function findAllChildren(folderId) {
  let children = await Folder.find({ parent: folderId, shown: true });

  for (const childFolder of children) {
    const childrenOfChildFolder = await findAllChildren(childFolder.id);

    children = children.concat(childrenOfChildFolder);
  }

  return children;
}

async function getFolderHierarchy(folderId) {
  const folderHierarchy = [];

  // Push the first folder (i.e., in the request body) to the folder heirarchy
  folderHierarchy.push(await Folder.findById(folderId).select('-parent'));

  let isFolderHierarchyComplete = false;
  let currentFolderId = folderId;

  while (!isFolderHierarchyComplete) {
    const parentFolder = await findParent(currentFolderId);

    if (parentFolder !== null) {
      folderHierarchy.push(parentFolder);
      currentFolderId = parentFolder.id;
    } else {
      isFolderHierarchyComplete = true;
    }
  }

  return folderHierarchy.reverse();
}

async function findParent(folderId) {
  const folder = await Folder.findById(folderId);
  const folderParent =
    (await Folder.findById(folder.parent).select('-parent')) || null;

  return folderParent;
}

module.exports = {
  getFolders,
  getFolder,
  createFolder,
  removeFolder,
  clearFolder,
  findImmediateChildren,
  findAllChildren,
  getFolderHierarchy,
  findParent
};

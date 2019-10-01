const Folder = require('../models/folder');

exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find({ shown: true });

    res.status(200).json({ folders: folders });
  } catch (err) {
    console.log(err);
  }
};

exports.findChildren = async folderId => {
  const children = await Folder.find({ parent: folderId });

  const childFoldersWithChildren = [];
  for (const childFolder of children) {
    const childFolderWithChildren = {
      _id: childFolder.id,
      name: childFolder.name,
      parent: childFolder.parent,
      children: (await this.findChildren(childFolder.id)) || []
    };

    childFoldersWithChildren.push(childFolderWithChildren);
  }

  return childFoldersWithChildren;
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
      await Folder.updateOne({ _id: folderId }, { $set: { shown: false } });

      res.status(200).json({ removedFolderId: folderId });
    }
  } catch (err) {
    console.log(err);
  }
};

const Folder = require('../models/folder');

exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find({ parent: null });

    const foldersWithChildren = [];
    for (const folder of folders) {
      const folderWithChildren = {
        _id: folder.id,
        name: folder.name,
        parent: folder.parent,
        children: (await this.findChildren(folder.id)) || []
      };

      foldersWithChildren.push(folderWithChildren);
    }

    res.status(200).json({ folders: foldersWithChildren });
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

exports.createFolder = async (req, res, next) => {
  try {
    const folderName = req.body.name || '';
    const folderParent = req.body.parent || null;

    const folder = new Folder({ name: folderName, parent: folderParent });
    const createdFolder = await folder.save();

    res.status(201).json({ folder: createdFolder });
  } catch (err) {
    console.log(err);
  }
};

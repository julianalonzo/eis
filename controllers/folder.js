const Folder = require('../models/folder');

exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find();

    res.status(200).json({ folders: folders });
  } catch (err) {
    console.log(err);
  }
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

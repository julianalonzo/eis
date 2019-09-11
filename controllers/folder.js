const Folder = require('../models/folder');

exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find();

    res.status(200).json({ folders: folders });
  } catch (err) {
    console.log(err);
  }
};

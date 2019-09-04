const { toArray } = require('../util/helperFunctions');
const path = require('path');

const File = require('../models/file');

// Route to create thumbnails
exports.createThumbnails = async (req, res, next) => {
  const uploadedThumbnails = [];
  if (req.files.thumbnails) {
    uploadedThumbnails = await this.saveFiles(
      'thumbnails',
      req.files.thumbnails
    );
  }

  res.status(201).json({ thumbnails: uploadedThumbnails });
};

// Function to save a file to the database. The type parameter must be thumbnail
// or attachment
exports.saveFile = async (type, uploadedFile) => {
  const file = new File({
    type: type,
    originalname: uploadedFile.originalname,
    mimetype: uploadedFile.mimetype,
    filename: uploadedFile.filename,
    path: uploadedFile.path
  });

  try {
    const savedFile = await file.save();

    return savedFile;
  } catch (err) {
    console.log(err);
  }
};

exports.saveFiles = async (type, uploadedFiles) => {
  const savedFiles = [];

  processedFiles = toArray(uploadedFiles);
  for (let i = 0; i < processedFiles.length; i++) {
    const savedFile = await this.saveFile(type, processedFiles[i]);
    savedFiles.push(savedFile);
  }

  return savedFiles;
};

exports.getFile = (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'uploads', req.params.filename));
};

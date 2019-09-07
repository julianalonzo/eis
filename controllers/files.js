const { toArray } = require('../util/helperFunctions');
const path = require('path');

const File = require('../models/file');

// Route to create thumbnails
exports.createThumbnails = async (req, res, next) => {
  const savedThumbnails = [];
  if (req.files.thumbnails) {
    savedThumbnails = await this.saveFiles('thumbnail', req.files.thumbnails);
  }

  res.status(201).json({ thumbnails: savedThumbnails });
};

// Route to create attachments
exports.createAttachments = async (req, res, next) => {
  const savedAttachments = [];
  if (req.files.attachments) {
    savedAttachments = await this.saveFiles(
      'attachment',
      req.files.attachments
    );
  }

  res.status(201).json({ attachments: savedAttachments });
};

// Function to save a file to the database. The type parameter must be thumbnail
// or attachment
exports.saveFile = async (type, uploadedFile) => {
  const file = new File({
    type: type,
    originalname: uploadedFile.originalname,
    mimetype: uploadedFile.mimetype,
    filename: uploadedFile.filename,
    path: uploadedFile.path,
    size: uploadedFile.size
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

const path = require('path');

const File = require('../models/file');

// Route to create thumbnails
exports.createThumbnails = (req, res, next) => {
  const uploadedThumbnails = [];
  if (req.files.thumbnails) {
    uploadedThumbnails = req.files.thumbnails;
  }

  const savedThumbnails = saveThumbnail(uploadedThumbnails);

  res.status(201).json({ thumbnails: savedThumbnails });
};

// Function to save a thumbnail to the database
exports.saveThumbnail = async uploadedThumbnail => {
  const thumbnail = new File({
    type: 'thumbnail',
    originalname: uploadedThumbnail.originalname,
    mimetype: uploadedThumbnail.mimetype,
    filename: uploadedThumbnail.filename,
    path: uploadedThumbnail.path
  });

  try {
    const savedThumbnail = await thumbnail.save();

    return savedThumbnail;
  } catch (err) {
    console.log(err);
  }
};

exports.getFile = (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'uploads', req.params.filename));
};

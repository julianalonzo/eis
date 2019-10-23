const fs = require('fs');
const path = require('path');

const { saveFileToBucket } = require('../modules/s3_upload');
const { toArray, parseElementsToJSON } = require('../util/helperFunctions');

const File = require('../models/file');

async function saveFiles(type, uploadedFiles) {
  const savedFiles = [];

  processedFiles = toArray(uploadedFiles);
  for (let i = 0; i < processedFiles.length; i++) {
    const savedFile = await saveFile(type, processedFiles[i]);
    savedFiles.push(savedFile);
  }

  return savedFiles;
}

// Function to save a file to the database. The type parameter must be thumbnail
// or attachment
async function saveFile(type, uploadedFile) {
  const bucketPath = await saveFileToBucket(uploadedFile);

  const file = new File({
    type: type,
    originalname: uploadedFile.originalname,
    mimetype: uploadedFile.mimetype,
    filename: uploadedFile.filename,
    path: bucketPath,
    size: uploadedFile.size
  });

  const fileTemporaryPath = path.join(__dirname, '..', 'tmp', file.filename);
  fs.unlinkSync(fileTemporaryPath);

  try {
    const savedFile = await file.save();

    return savedFile;
  } catch (err) {
    console.log(err);
  }
}

function extractIdsFromExistingFiles(type, existingFiles) {
  const idsOfExistingFiles = existingFiles
    ? parseElementsToJSON(existingFiles).map(existingFile => {
        return existingFile._id;
      })
    : [];

  return idsOfExistingFiles;
}

async function extractIdsFromNewFiles(type, newFiles) {
  const savedFiles = await saveFiles(type, newFiles);

  const idsOfSavedFiles = savedFiles.map(savedFile => {
    return savedFile.id;
  });

  return idsOfSavedFiles;
}

module.exports = {
  extractIdsFromExistingFiles,
  extractIdsFromNewFiles
};

const { saveFileToBucket } = require('../modules/s3_upload');
const { toArray, parseElementsToJSON } = require('../util/helperFunctions');

const File = require('../models/file');

exports.saveFiles = async (type, uploadedFiles) => {
  const savedFiles = [];

  processedFiles = toArray(uploadedFiles);
  for (let i = 0; i < processedFiles.length; i++) {
    const savedFile = await this.saveFile(type, processedFiles[i]);
    savedFiles.push(savedFile);
  }

  return savedFiles;
};

// Function to save a file to the database. The type parameter must be thumbnail
// or attachment
exports.saveFile = async (type, uploadedFile) => {
  const bucketPath = await saveFileToBucket(uploadedFile);

  const file = new File({
    type: type,
    originalname: uploadedFile.originalname,
    mimetype: uploadedFile.mimetype,
    filename: uploadedFile.filename,
    path: bucketPath,
    size: uploadedFile.size
  });

  // Delete tmp file

  try {
    const savedFile = await file.save();

    return savedFile;
  } catch (err) {
    console.log(err);
  }
};

exports.extractIdsFromExistingFiles = (type, existingFiles) => {
  const idsOfExistingFiles = existingFiles
    ? parseElementsToJSON(existingFiles).map(existingFile => {
        return existingFile._id;
      })
    : [];

  return idsOfExistingFiles;
};

exports.extractIdsFromNewFiles = async (type, newFiles) => {
  const savedFiles = await this.saveFiles(type, newFiles);

  const idsOfSavedFiles = savedFiles.map(savedFile => {
    return savedFile.id;
  });

  return idsOfSavedFiles;
};

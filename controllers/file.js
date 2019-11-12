const fs = require("fs");
const path = require("path");

const { saveFileToBucket } = require("../modules/s3_upload");
const { toArray } = require("../util/helperFunctions");

const File = require("../models/file");

/**
 *
 * @param {mongoose.Types.ObjectId} userId User who uploaded the file
 * @param {string} type Either 'thumbnail' or 'attachment'
 * @param {[File]} uploadedFiles An array of files from the multer middleware
 * @returns {[mongoose.Types.ObjectId]} An array of Object ID of the saved files
 */
async function saveFiles(userId, type, uploadedFiles) {
  const savedFiles = [];

  processedFiles = toArray(uploadedFiles);
  for (let i = 0; i < processedFiles.length; i++) {
    const savedFile = await saveFile(userId, type, processedFiles[i]);
    savedFiles.push(savedFile);
  }

  return savedFiles;
}

/**
 *
 * @param {mongoose.Types.ObjectId} userId User who uploaded the file
 * @param {string} type Either 'thumbnail' or 'attachment'
 * @param {File} uploadedFile File from the multer middleware
 * @returns {mongoose.Types.ObjectId} Object ID of the saved file
 */
async function saveFile(userId, type, uploadedFile) {
  const bucketPath = await saveFileToBucket(uploadedFile);

  const file = new File({
    type: type,
    originalname: uploadedFile.originalname,
    mimetype: uploadedFile.mimetype,
    filename: uploadedFile.filename,
    path: bucketPath,
    size: uploadedFile.size,
    user: userId
  });

  const fileTemporaryPath = path.join(__dirname, "..", "tmp", file.filename);
  fs.unlinkSync(fileTemporaryPath);

  const savedFile = await file.save();

  return savedFile._id;
}

module.exports = {
  saveFiles
};

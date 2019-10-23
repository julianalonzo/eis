const multer = require('multer');
const uuidv4 = require('uuid/v4');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname);
  }
});

const upload = multer({ storage: fileStorage });

module.exports = upload;

require('dotenv').config('../.env');
const fs = require('fs');
const path = require('path');

const aws = require('aws-sdk');
aws.config.update({ region: 'us-west-2' });

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.saveFileToBucket = async file => {
  const filePath = path.join(__dirname, '..', 'tmp', file.filename);

  const fileContent = fs.readFileSync(filePath);

  fs.unlinkSync(filePath);

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.filename,
    Body: fileContent
  };

  await s3.upload(uploadParams).promise();

  return `https://${process.env.S3_BUCKET_NAME}.s3-us-west-2.amazonaws.com/${file.filename}`;
};

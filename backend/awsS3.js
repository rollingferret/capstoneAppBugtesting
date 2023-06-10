const AWS = require("aws-sdk");
const multer = require("multer");

AWS.config.update({
 signatureVersion: "v4",
 region: "us-west-1", // Specify the correct region here
});
//If you use an incorrect signature version, you will not be able to authenticate your requests to AWS services 4.

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "imgappbucket"; // <-- Use your bucket name here

const singleFileDelete = async (key) => {
 const params = {
  Bucket: NAME_OF_BUCKET,
  Key: key,
 };
 s3
  .deleteObject(params)
  .promise()
  .then(() => {
   console.log("S3 File deleted successfully");
  })
  .catch((err) => {
   console.log("lalala");
   console.log(err);
   return err;
  });
};

// backend/awsS3.js

const singleFileUpload = async ({ file, public = false }) => {
 console.log('inside singleFileUpload-----------------------------------')
 const { originalname, buffer } = file;
 const path = require("path");

 // Set the name of the file in your S3 bucket to the date in ms plus the
 // extension name.
 const Key = new Date().getTime().toString() + path.extname(originalname);
 console.log(Key, 'Key-----------------------------------')
 const uploadParams = {
  Bucket: NAME_OF_BUCKET,
  Key: public ? `public/${Key}` : Key,
  Body: buffer,
 };
 console.log(uploadParams, 'uploadParams-----------------------------------')
 console.log(await s3.upload(uploadParams).promise())
 const result = await s3.upload(uploadParams).promise();
 console.log(result, 'result-----------------------------------')

 // Return the link if public. If private, return the name of the file in your
 // S3 bucket as the key in your database for subsequent retrieval.
 return public ? result.Location : result.Key;
};
// backend/awsS3.js

const multipleFilesUpload = async ({ files, public = false }) => {
 return await Promise.all(
  files.map((file) => {
   return singleFileUpload({ file, public });
  })
 );
};
// backend/awsS3.js

const retrievePrivateFile = (key) => {
 let fileUrl;
 if (key) {
  fileUrl = s3.getSignedUrl("getObject", {
   Bucket: NAME_OF_BUCKET,
   Key: key,
  });
 }
 return fileUrl || key;
};

// store the file in memory

const storage = multer.memoryStorage({
 destination: function (req, file, callback) {
  callback(null, "");
 },
});

const singleMulterUpload = (nameOfKey) =>
 multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
 multer({ storage: storage }).array(nameOfKey);

module.exports = {
 s3,
 singleFileDelete,
 singleFileUpload,
 multipleFilesUpload,
 retrievePrivateFile,
 singleMulterUpload,
 multipleMulterUpload,
};

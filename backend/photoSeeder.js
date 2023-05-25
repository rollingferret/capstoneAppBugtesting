const AWS = require("aws-sdk");
//const multer = require("multer");

AWS.config.update({
 //accessKeyId: "",
 //secretAccessKey:"",
 signatureVersion: "v4",
 region: "us-west-1", // Specify the correct region here
});
//If you use an incorrect signature version, you will not be able to authenticate your requests to AWS services 4.

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "imgappbucket";
const fs = require("fs");
//const path = require("path");
//const filePath = path.resolve("cabin-by-lake.jpg");
const filePath = "/root/appAcademy/helen/Imageckr/backend/db/s3/";

//seeder

// const SingleSeedUpload = async (file) => {
//  const params = {
//   Bucket: NAME_OF_BUCKET,
//   Key: file.name,
//   Body: fs.readFileSync(file.path),
//  };
//  return await s3.upload(params).promise();
// };

const MultipleSeedsUpload = () => {
 const files = [
  {
   name: "tulips.jpg",
   path: filePath + "tulips.jpg",
  },
  {
   name: "trail-in-the-wood.jpg",
   path: filePath + "trail-in-the-wood.jpg",
  },
  {
   name: "glasses.jpg",
   path: filePath + "glasses.jpg",
  },
  {
   name: "cabin-by-lake.jpg",
   path: filePath + "cabin-by-lake.jpg",
  },
  {
   name: "alocasia.jpg",
   path: filePath + "alocasia.jpg",
  },
  {
   name: "petal.jpg",
   path: filePath + "petal.jpg",
  },
  {
   name: "slug.jpg",
   path: filePath + "slug.jpg",
  },
  {
   name: "street-at-night.jpg",
   path: filePath + "street-at-night.jpg",
  },
  {
   name: "temple-in-mountain.jpg",
   path: filePath + "temple-in-mountain.jpg",
  },
  {
   name: "sunset-on-beach.jpg",
   path: filePath + "sunset-on-beach.jpg",
  },
  {
   name: "tree.jpg",
   path: filePath + "tree.jpg",
  },
  {
   name: "ship.jpg",
   path: filePath + "ship.jpg",
  },
  {
   name: "lake-on-mountain.jpg",
   path: filePath + "lake-on-mountain.jpg",
  },
  {
   name: "bird-dance.jpg",
   path: filePath + "bird-dance.jpg",
  },
 ];

 console.log("files", files);

 files.forEach((file) => {
  const params = {
   Bucket: NAME_OF_BUCKET,
   Key: file.name,
   Body: fs.readFileSync(file.path),
  };
  s3.upload(params, (err, data) => {
   if (err) {
    console.error("Error uploading file:", err);
   } else {
    console.log("File uploaded successfully:", data.Location);
   }
  });
 });
};

MultipleSeedsUpload();

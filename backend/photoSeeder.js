const AWS = require("aws-sdk");
//const multer = require("multer");

AWS.config.update({
 //accessKeyId: "",
 //secretAccessKey: "",
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
  {
   name: "bird-perch.jpg",
   path: filePath + "bird-perch.jpg",
  },
  {
   name: "light-house.jpg",
   path: filePath + "light-house.jpg",
  },
  {
   name: "rock-cliff.jpg",
   path: filePath + "rock-cliff.jpg",
  },
  {
   name: "stalking-cat.jpg",
   path: filePath + "stalking-cat.jpg",
  },
  {
   name: "watching-cat.jpg",
   path: filePath + "watching-cat.jpg",
  },
  {
   name: "old-tree.jpg",
   path: filePath + "old-tree.jpg",
  },
  {
   name: "sparrow-hawk.jpg",
   path: filePath + "sparrow-hawk.jpg",
  },
  {
   name: "Milky-Way-Mandu-Gorge.jpg",
   path: filePath + "Milky-Way-Mandu-Gorge.jpg",
  },
  {
   name: "water-games.jpg",
   path: filePath + "water-games.jpg",
  },
  {
   name: "field.jpg",
   path: filePath + "field.jpg",
  },
  {
   name: "ladybugs.jpg",
   path: filePath + "ladybugs.jpg",
  },
  {
   name: "lonely-island.jpg",
   path: filePath + "lonely-island.jpg",
  },
  {
   name: "duck-head.jpg",
   path: filePath + "duck-head.jpg",
  },
  {
   name: "dragonfly.jpg",
   path: filePath + "dragonfly.jpg",
  },
  {
   name: "Italie-fontaine.jpg",
   path: filePath + "Italie-fontaine.jpg",
  },
  {
   name: "roadside-hawk.jpg",
   path: filePath + "roadside-hawk.jpg",
  },
  {
   name: "historic-hotel.jpg",
   path: filePath + "historic-hotel.jpg",
  },
  {
   name: "Tribune-Tower.jpg",
   path: filePath + "Tribune-Tower.jpg",
  },
  {
   name: "Tower-of-London.jpg",
   path: filePath + "Tower-of-London.jpg",
  },
  {
   name: "historic-Pothole.jpg",
   path: filePath + "historic-Pothole.jpg",
  },
  {
   name: "Historic-Springfield-Cruise.jpg",
   path: filePath + "Historic-Springfield-Cruise.jpg",
  },
  {
   name: "play-ball-dog.jpg",
   path: filePath + "play-ball-dog.jpg",
  },
  {
   name: "dog-friendship.jpg",
   path: filePath + "dog-friendship.jpg",
  },
  {
   name: "dog-king.jpg",
   path: filePath + "dog-king.jpg",
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

// ...
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// ...
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Photo } = require("../../db/models/photo");

const router = express.Router();

// backend/routes/api/users.js
// ...
const validateAddPhoto = [
 //checkFalsy: if true, fields with falsy values (eg "", 0, false, null) will also not exis
 check("title").exists({ checkFalsy: true }).withMessage("Title is required."),
 check("url").exists({ checkFalsy: true }).withMessage("Url is required."),
 handleValidationErrors,
];

// backend/routes/api/users.js
// ...

//GET ALL PHOTO

// backend/routes/api/users.js
// ...
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// ...
const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// backend/routes/api/users.js
// ...
const validateSignup = [
 //checkFalsy: if true, fields with falsy values (eg "", 0, false, null) will also not exis
 check("email")
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage("Please provide a valid email."),
 check("username")
  .exists({ checkFalsy: true })
  .isLength({ min: 4 })
  .withMessage("Please provide a username with at least 4 characters."),
 check("firstname")
  .exists({ checkFalsy: true })
  .isLength({ min: 2 })
  .withMessage("Please provide a firstname with at least 4 characters."),
 check("lastname")
  .exists({ checkFalsy: true })
  .isLength({ min: 2 })
  .withMessage("Please provide a lastname with at least 4 characters."),
 check("username").not().isEmail().withMessage("Username cannot be an email."),
 check("password")
  .exists({ checkFalsy: true })
  .isLength({ min: 6 })
  .withMessage("Password must be 6 characters or more."),
 handleValidationErrors,
];

// backend/routes/api/users.js
// ...

// Sign up
router.post("", validateSignup, async (req, res) => {
 const { email, firstname, lastname, password, username } = req.body;
 const hashedPassword = bcrypt.hashSync(password);
 const user = await User.create({
  email,
  username,
  firstname,
  lastname,
  hashedPassword,
 });

 const safeUser = {
  id: user.id,
  email: user.email,
  firstname: user.firstname,
  lastname: user.lastname,
  username: user.username,
 };

 await setTokenCookie(res, safeUser);

 return res.json({
  user: safeUser,
 });
});
// backend/routes/api/users.js
// ...

module.exports = router;

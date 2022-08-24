const express = require("express");
const router = new express.Router();
const upload = require("../utils/multerProfile");
const { verifyUser } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  checkPassword,
  viewUser,
  changeProfilePicture,
  changeProfileInfo,
  changePassword,
  publishProgress,
} = require("../controller/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/checkPassword", verifyUser, checkPassword);

router.get("/view", verifyUser, viewUser);

router.put(
  "/changeProfilePicture",
  verifyUser,
  upload.single("profile"),
  changeProfilePicture
);

router.put("/changeProfileInfo", verifyUser, changeProfileInfo);

router.put("/changePassword", verifyUser, changePassword);

router.get("/progressPublication", verifyUser, publishProgress);

module.exports = router;

const express = require("express");
const router = new express.Router();
const upload = require("../utils/multerWorkout");
const { verifyUser } = require("../middleware/authMiddleware");
const {
  addStep,
  deleteStep
} = require("../controller/exerciseStepController");

router.post("/add", verifyUser, upload.single("workout"), addStep);

module.exports = router;

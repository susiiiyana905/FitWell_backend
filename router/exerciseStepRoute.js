const express = require("express");
const router = new express.Router();
const upload = require("../utils/multerWorkout");
const { verifyUser } = require("../middleware/authMiddleware");
const {
  addStep,
  exerciseSteps,
} = require("../controller/exerciseStepController");

router.post("/add", verifyUser, upload.single("workout"), addStep);

router.post("/get", verifyUser, exerciseSteps);

module.exports = router;

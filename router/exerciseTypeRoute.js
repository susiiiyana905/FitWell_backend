const express = require("express");
const router = new express.Router();
const upload = require("../utils/multerWorkout");
const { verifyUser } = require("../middleware/authMiddleware");
const {
  addExerciseType,
  deleteExerciseType,
} = require("../controller/exerciseTypeController");

router.post("/add", verifyUser, upload.single("workout"), addExerciseType);

router.delete("/delete", verifyUser, deleteExerciseType);

module.exports = router;

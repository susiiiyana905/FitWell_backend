const express = require("express");
const router = new express.Router();
const upload = require("../utils/multerWorkout");
const { verifyUser } = require("../middleware/authMiddleware");
const {
  addExerciseType,
  deleteExerciseType,
  getExerciseType,
} = require("../controller/exerciseTypeController");

router.post("/add", verifyUser, upload.single("workout"), addExerciseType);

router.delete("/delete", verifyUser, deleteExerciseType);

router.get("/get", verifyUser, getExerciseType);

module.exports = router;

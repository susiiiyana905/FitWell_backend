const express = require("express");
const router = new express.Router();
const upload = require("../utils/multerWorkout");
const { verifyUser } = require("../middleware/authMiddleware");
const {
  addExercise,
  deleteExercise,
  getExercises,
} = require("../controller/exerciseController");

router.post("/add", verifyUser, upload.single("workout"), addExercise);

router.delete("/delete", verifyUser, deleteExercise);

router.post("/get", verifyUser, getExercises);

module.exports = router;

const express = require("express");
const router = new express.Router();
const { verifyUser } = require("../middleware/authMiddleware");

const {
  addCompletedExercise,
  myExercises,
  
} = require("../controller/completedExerciseController");

router.post("/add", verifyUser, addCompletedExercise);

router.get("/myExercises", verifyUser, myExercises);

module.exports = router;

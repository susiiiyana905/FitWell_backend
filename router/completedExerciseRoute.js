const express = require("express");
const router = new express.Router();
const { verifyUser } = require("../middleware/authMiddleware");

const {
  addCompletedExercise,
  usersProgress
} = require("../controller/completedExerciseController");

router.post("/add", verifyUser, addCompletedExercise);
router.get("/viewRank",verifyUser, usersProgress)

module.exports = router;

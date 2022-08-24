const asyncHandler = require("express-async-handler");
const completedExercise = require("../model/completedExerciseModel");
const progress = require("../model/progressModel");
const user = require("../model/userModel");

const addCompletedExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body;

  await completedExercise.create({
    exerciseName: exerciseId,
  });

  const userProgress = await progress.findOne({ user: req.userInfo._id });
  await progress.updateOne(
    { user: req.userInfo._id },
    {
      progress: userProgress.progress + 25,
    }
  );

  res.send({ resM: "Exercise Completed" });
});

const usersProgress = asyncHandler(async (req, res) => {
  const users = await user.find({ progressPublication: true });

  const progressPoints = await progress
    .find({ user: { $in: users } })
    .populate("user")
    .sort({ progress: -1 })
    .limit(20);

  res.send(progressPoints);
});

module.exports = { addCompletedExercise, usersProgress };

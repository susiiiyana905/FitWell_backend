const asyncHandler = require("express-async-handler");
const completedExercise = require("../model/completedExerciseModel");
const progress = require("../model/progressModel");
const user = require("../model/userModel");
const exercise = require("../model/exerciseModel");

const addCompletedExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body;

  await completedExercise.create({
    exerciseName: exerciseId,
    user: req.userInfo._id,
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

const myExercises = asyncHandler(async (req, res) => {
  const userData = await user.findOne({ _id: req.userInfo._id });

  const currentDateTime = new Date();

  const todayTime =
    (currentDateTime.getHours() * 60 * 60 +
      currentDateTime.getMinutes() * 60 +
      currentDateTime.getSeconds()) *
      1000 +
    currentDateTime.getMilliseconds();

  const today = new Date(Date.now() - todayTime);
  const recent = new Date(Date.now() - 604800000);

  const todayCompletedExercises = await completedExercise
    .find({
      user: req.userInfo._id,
      createdAt: { $gte: today },
    })
    .populate("exerciseName");

  const exerciseIds = [];
  for (let i = 0; i < todayCompletedExercises.length; i++) {
    if (!exerciseIds.includes(todayCompletedExercises[i]._id)) {
      exerciseIds.push(todayCompletedExercises[i].exerciseName._id);
    }
  }

  const todayExercises = await exercise
    .find({
      _id: { $in: exerciseIds },
    })
    .populate("exerciseType");

  const recentCompletedExercises = await completedExercise
    .find({
      user: req.userInfo._id,
      createdAt: { $gte: recent, $lte: today },
    })
    .populate("exerciseName");

  const exerciseIds1 = [];
  for (let i = 0; i < recentCompletedExercises.length; i++) {
    if (!exerciseIds1.includes(recentCompletedExercises[i]._id)) {
      exerciseIds1.push(recentCompletedExercises[i].exerciseName._id);
    }
  }

  const recentExercises = await exercise
    .find({
      _id: { $in: exerciseIds1 },
    })
    .populate("exerciseType");

  const completedExerciseIds = [];
  const completedExerciseIdsCount = [];
  const favoriteExercise = [];
  const favoriteSortedExercise = [];
  const completedExercises = await completedExercise
    .find({
      user: req.userInfo._id,
      createdAt: { $gte: recent },
    })
    .populate("exerciseName");

  for (let i = 0; i < completedExercises.length; i++) {
    if (
      completedExerciseIds.includes(completedExercises[i].exerciseName._id) ===
      false
    ) {
      completedExerciseIds.push(completedExercises[i].exerciseName._id);
      completedExerciseIdsCount.push(1);
    } else {
      const exerciseIndex = completedExerciseIds.indexOf(
        completedExercises[i].exerciseName._id
      );
      completedExerciseIdsCount[exerciseIndex] =
        completedExerciseIdsCount[exerciseIndex] + 1;
    }
  }
  
  for (let i = 0; i < completedExerciseIds.length; i++) {
    favoriteExercise.push({ id: completedExerciseIds[i], count: completedExerciseIdsCount[i] });
  }
  favoriteExercise.sort((a, b) => b.count - a.count); // Sorting according to the count
  for (let i = 0; i < favoriteExercise.length; i++) {
    if (favoriteSortedExercise.length <= 2) {
      favoriteSortedExercise.push(favoriteExercise[i].id.toString());
    }
  }

  const myFavorite = await exercise.find({_id: {$in: favoriteSortedExercise}});

  res.send({
    profilePicture: userData.profilePicture,
    todayProgressPoint: todayCompletedExercises.length*25,
    todayExercises: todayExercises,
    recentExercises: recentExercises,
    myFavorite: myFavorite,
  });
});

module.exports = { addCompletedExercise, myExercises };

const asyncHandler = require("express-async-handler");
const exerciseType = require("../model/exerciseTypeModel");
const { cloudinary } = require("../utils/cloudinary");

const addExerciseType = asyncHandler(async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send({
      resM: "Invalid image format, only supports png or jpeg image format.",
    });
  }

  const name = req.body.name;

  await exerciseType.create({
    name: name,
    image: req.file.path,
  });

  res.send({ resM: "Exercise Type Created" });
});

const deleteExerciseType = asyncHandler(async (req, res) => {
  const exerciseTypeId = req.body.exerciseTypeId;

  const exerciseData = await exerciseType.findOne({ _id: exerciseTypeId });

  await cloudinary.uploader.destroy(
    "FitWell/Workout/" + exerciseData.image.split("FitWell/Workout/")[1].split(".")[0]
  );

  await exerciseType.deleteOne({ _id: exerciseTypeId });
  res.send({ resM: "Exercise Type deleted" });
});

module.exports = { addExerciseType, deleteExerciseType };

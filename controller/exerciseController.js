const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const exercise = require("../model/exerciseModel");

const addExercise = asyncHandler(async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send({
      resM: "Invalid image format, only supports png or jpeg image format.",
    });
  }

  const { name, description, exerciseTypeId } = req.body;

  await exercise.create({
    name: name,
    description: description,
    exerciseType: exerciseTypeId,
    image: req.file.path,
  });

  res.send({ resM: "Exercise Created" });
});

const deleteExercise = asyncHandler(async (req, res) => {
  const { name, description, image, exerciseType } = req.body;
});
module.exports = { addExercise, deleteExercise };

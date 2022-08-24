const asyncHandler = require("express-async-handler");
const exerciseStep = require("../model/exerciseStepModel");

const addStep = asyncHandler(async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send({
      resM: "Invalid image format, only supports png or jpeg image format.",
    });
  }

  const { step, exerciseId } = req.body;

  await exerciseStep.create({
    step: step,
    image: req.file.path,
    exerciseName: exerciseId,
  });

  res.send({ resM: "Step Created" });
});

module.exports = { addStep };

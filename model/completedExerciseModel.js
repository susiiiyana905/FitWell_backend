const mongoose = require("mongoose");

const completedExerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: mongoose.Schema.ObjectId,
      ref: "exercise",
    },
  },
  {
    timestamps: true,
  }
);

const completedExercise = mongoose.model(
  "completedExercise",
  completedExerciseSchema
);
module.exports = completedExercise;

const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    exerciseType: {
      type: mongoose.Schema.ObjectId,
      ref: "exerciseType",
    },
  },
  {
    timestamps: true,
  }
);

const exercise = mongoose.model("exercise", exerciseSchema);

module.exports = exercise;

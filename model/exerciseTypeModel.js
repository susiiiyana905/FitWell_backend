const mongoose = require("mongoose");

const exerciseTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const exerciseType = mongoose.model("exerciseType", exerciseTypeSchema);

module.exports = exerciseType;

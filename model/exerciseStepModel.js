const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    step: [
      {
        type: String,
      },
    ],
    exerciseName: {
      type: mongoose.Schema.ObjectId,
      ref: "exercise",
    },
  },
  {
    timestamps: true,
  }
);

const step = mongoose.model("step", stepSchema);

module.exports = step;

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },

    progress: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

const progress = mongoose.model("progress", progressSchema);

module.exports = progress;

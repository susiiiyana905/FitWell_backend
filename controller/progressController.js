const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const progress = require("../model/progressModel");
const user = require("../model/userModel");

const userProgress = asyncHandler(async (req, res) => {
  const userProgress = await progress
    .findOne({ user: req.userInfo._id })
    .populate(
      "user",
      "email profileName profilePicture gender progressPublication"
    );

  res.send({ progress: userProgress });
});

const usersProgress = asyncHandler(async (req, res) => {
  const users = await user.find({ progressPublication: true });

  const progressPoints = await progress
    .find({ user: { $in: users } })
    .populate("user")
    .sort({ progress: -1 })
    .limit(20);

  const tmpPoints = await progress
    .find({ user: { $in: users } })
    .populate("user")
    .sort({ tmp: -1 })
    .limit(20);

  const pmpPoints = await progress
    .find({ user: { $in: users } })
    .populate("user")
    .sort({ pmp: -1 })
    .limit(20);

  res.send({
    progressPoints: progressPoints,
    tmpPoints: tmpPoints,
    pmpPoints: pmpPoints,
  });
});

module.exports = { userProgress, usersProgress };

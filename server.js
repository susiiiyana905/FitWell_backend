const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./database/connectDB");

app.get("/", (req, res) => {
  res.send("Welcome to FitWell app.");
});

const userRoute = require("./router/userRoute");
app.use("/user", userRoute);

const tokenRoute = require("./router/tokenRoute");
app.use("/token", tokenRoute);

const exerciseType = require("./router/exerciseTypeRoute");
app.use("/type", exerciseType);

const exercise = require("./router/exerciseRoute");
app.use("/exercise", exercise);

const exerciseStep = require("./router/exerciseStepRoute");
app.use("/step", exerciseStep);

const completedExercise = require("./router/completedExerciseRoute");
app.use("/completed", completedExercise);

const progressRoute = require("./router/progressRoute");
app.use("/progress", progressRoute);

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log("Server running on port: 8001...");
});

const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// routes
// fetch for getLastWork
app.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields:{
        totalDuration: {$sum: "$exercises.duration"}
      }
    }
  ]).then(dbWorkout => {
    res.json(dbWorkout);
  }).catch(err => {
    res.json(err);
  });
});




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
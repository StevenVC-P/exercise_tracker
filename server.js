const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
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
// html routes
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.get('/exercise', (req,res) =>{
  res.sendFile(path.join(__dirname,"./public/exercise.html"));
});

app.get('/stats', (req,res) =>{
  res.sendFile(path.join(__dirname,"./public/stats.html"));
});

// api routes
// fetch for getLastWork
app.get("/api/workouts/", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields:{
        totalDuration: {$sum: "$exercises.duration"}
      }
    }
  ])
  .then(dbWorkout => {
    res.json(dbWorkout);
  }).catch(err => {
    res.json(err);
  });
});

//fetch for createWorkout
app.post("/api/workouts/", ({body}, res) => {
  db.Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  }).catch(err => {
    res.json(err);
  });
});

//fetch for addExercise
app.put("/api/workouts/:id", (req, res) => {
  id = req.params.id
  db.Workout.findOneAndUpdate({ "_id": id}, { $push: { exercises: req.body } })
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err)
  })
})

//fetch for getWorkoutsInRange
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  }).catch(err => {
    res.json(err);
  });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type:  {
            type: String,
        },
        name: {
            type: String,
            trim: true,
            required: "Workout name is required"
        },
        duration: {
            type: Number,
            trim: true,
            required: "Workout duration is required"
        },
        weight: {
            type: Number,
            trim: true,
        },
        reps: {
            type: Number,
            trim: true,
        },
        sets: {
            type: Number,
            trim: true,
        },
        distance: {
            type: Number,
            trim: true,
        },
    }]

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
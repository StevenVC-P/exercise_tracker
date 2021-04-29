const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Exercise type is required"
    },
    name: {
        type: String,
        trim: true,
        required: "Exercise name is required"
    },
    duration: {
        type: Number,
        trim: true,
        required: "Exercise duration is required"
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
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
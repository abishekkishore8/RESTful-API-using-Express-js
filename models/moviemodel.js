const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the Movie name"]
        },
        year: {
            type: Number,
            required: true,
            default:0
        },
        rating:{
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;
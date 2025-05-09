const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    givenRating: {
        score: {
            type: Number,
            required: true
        },
        ratedBy: {
            type: String,
            unique: true,
            required: true
        }
    }
});

module.exports = mongoose.model('rating', ratingSchema);
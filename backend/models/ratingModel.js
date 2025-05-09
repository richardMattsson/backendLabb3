const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    givenRating: [{
        score: {
            type: Number,
        },
        ratedBy: {
            type: String,
        }
    }]
});

module.exports = mongoose.model('rating', ratingSchema);
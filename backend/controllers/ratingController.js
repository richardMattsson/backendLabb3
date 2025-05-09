const RatingModel = require('../models/ratingModel');

// not ready yet
exports.getUserAvgRating = async (req, res) => {
    try {
        const rating = await RatingModel.find();
        res.json(rating)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.getGivenScore = async (req, res) => {
    const { doerEmail, creatorEmail } = req.query;
    try {
        const score = await RatingModel.find({username: doerEmail, 'givenRating.ratedBy': creatorEmail}, { });
        res.json(score);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
}

//create a user entry in the rating db - should run together with the registration or tacka ja function?
exports.addUserToRating = async (req, res) => {
    const { username } = req.body;
    const userRating = new RatingModel({
        username,
        givenRating: []
    })

    if (!username) {
        return res.status(400).json({ error: 'username saknas' });
      }

    try {
        const newUserRating = await userRating.save();
        res.status(201).json(newUserRating);
       }
       catch (error) {
           res.status(500).json({ error: error.message });
         }
}

//adding the score itself
exports.addScore = async (req, res) => {
    const { username, score, ratedBy} = req.body;

    if (!username || !score || !ratedBy) {
        return res.status(400).json({ error: 'Missing required fields (username, score, ratedBy).' });
      }
      
    try {
     const newScore = await RatingModel.updateOne(
        {username}, 
        {$push: {
            givenRating: {score, ratedBy}
        }});
     res.status(201).json(newScore);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
}


exports.deleteScore = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
}
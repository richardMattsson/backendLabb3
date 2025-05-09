const RatingModel = require('../models/ratingModel');

// not ready yet
exports.getAvgRating = async (req, res) => {
    try {
        const rating = await RatingModel.aggregate([
            {
                $project: {
                    _id: 0, 
                    username: 1, 
                    nRatings: { $size: "$givenRating" }, 
                    avgRating: {
                        $avg: {
                            $map: {
                                input: "$givenRating", 
                                as: "r", 
                                in: "$$r.score" 
                            }
                        }
                    }
                }
            }
        ]);
        res.json(rating)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// to get the score that creator gave to a doer
exports.getGivenScore = async (req, res) => {
    const { doerEmail, creatorEmail } = req.query;
    try {
        const score = await RatingModel.find({ username: doerEmail, 'givenRating.ratedBy': creatorEmail }, {'givenRating.$': 1});
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
    const { username, score, ratedBy } = req.body;

    if (!username || !score || !ratedBy) {
        return res.status(400).json({ error: 'Missing required fields (username, score, ratedBy).' });
    }

    try {
        const newScore = await RatingModel.findOneAndUpdate(
            { username },
            { $push: { givenRating: { score, ratedBy } } },
            { new: true, upsert: true } // 'new' returns the updated document, 'upsert' creates the user if not found
        );
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
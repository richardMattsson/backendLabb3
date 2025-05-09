const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/score', ratingController.getGivenScore);
router.get('/rating', ratingController.getAvgRating);
router.post('/rating', ratingController.addUserToRating);
router.patch('/score', ratingController.addScore);
router.delete('/score', ratingController.deleteScore);


module.exports = router;
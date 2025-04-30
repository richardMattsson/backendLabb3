const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/user', userController.getUser);


module.exports = router;

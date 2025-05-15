const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');

router.get('/users', userController.getUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;

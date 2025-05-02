const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', userController.getUser);
router.get('/api/users/:id/:tasksrole', userController.getUserTasksRole);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);

module.exports = router;

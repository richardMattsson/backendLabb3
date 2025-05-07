const express = require('express');
const router = express.Router();
const userTaskController = require('../controllers/userTaskController');

router.get('/api/user-tasks', userTaskController.getUserTasks);
router.get('/api/user-tasks/:userId', userTaskController.getUserTask);
router.post('/api/user-tasks', userTaskController.createUserTask);
router.post('/api/confirm-doer', userTaskController.confirmDoer);

router.put('/api/user-tasks', userTaskController.updateUserTask);
router.delete('/api/user-tasks/:userId', userTaskController.deleteUserTask);

module.exports = router;

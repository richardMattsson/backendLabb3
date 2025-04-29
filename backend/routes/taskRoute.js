const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/api/tasks', taskController.getTasks);
router.get('/api/tasks/:taskId', taskController.getTask);
router.get('/api/tasks/users/:taskId', taskController.getTaskUserDetails)

module.exports = router;
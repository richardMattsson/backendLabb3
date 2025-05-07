const express = require('express');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/api/tasks', taskController.getTasks);
router.get('/api/tasks/:taskId', taskController.getTask);
router.get('/api/tasks/details/:taskId', taskController.getTaskUserDetails);
router.get(
  '/api/tasks/by-category/:categoryId',
  taskController.getTasksInCategory
);
router.get('/api/newtasks/', taskController.getNewTasks);

//router.post('/api/tasks', taskController.createTask);
router.put('/api/tasks/:taskId', taskController.editTask);
router.delete('/api/tasks/:taskId', taskController.deleteTask);

// Protected routes
router.post('/api/tasks', verifyToken, taskController.createTask);

module.exports = router;

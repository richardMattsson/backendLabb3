const express = require('express');
const router = express.Router();
const userTaskController = require('../controllers/userTaskController');

router.post('/', userTaskController.createUserTask);
router.get('/:userId', userTaskController.getUserTasks);
router.put('/:id', userTaskController.updateUserTask);
router.delete('/:id', userTaskController.deleteUserTask);

module.export = router;

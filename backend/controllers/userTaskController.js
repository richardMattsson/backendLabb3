const userTaskService = require('../services/userTaskService');

exports.getUserTasks = async (req, res) => {
  try {
    const userTasks = await userTaskService.getUserTasks();
    res.json({ userTasks });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getUserTask = async (req, res) => {
  const { userId } = req.params;
  try {
    const task = await userTaskService.getUserTask(userId);
    res.json({ task });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.createUserTask = async (req, res) => {
  const { userRole, userTaskTId, userTaskUId } = req.body;

  try {
    await userTaskService.createUserTask(userRole, userTaskTId, userTaskUId);
    return res.status(201).json({
      success: true,
      message: 'Du har skapat en userTask!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUserTask = async (req, res) => {
  const { userTaskId, confirmed } = req.body;
  try {
    await userTaskService.updateUserTask(userTaskId, confirmed);
    res.status(200).json({
      success: true,
      message: 'userTask uppdaterad!',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteUserTask = async (req, res) => {
  const { userId } = req.params;

  try {
    await userTaskService.deleteUserTask(userId);
    res.status(200).json({
      success: true,
      message: 'userTask raderad!',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

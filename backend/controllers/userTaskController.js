const userTaskService = require('..services/userTaskService')

const createUserTask = async (req, res) => {
    const { userRole, userTaskTId, userTaskUId, confirmed } = req.body;
}

try {
    const result = await userTaskService.createUserTask(
        userRole,
        userTaskTId,
        userTaskUId,
        confirmed
    )
    res.status(201).json({
        success: true,
        message: 'Du har skapat en userTask!',
        userTaskId: result.userTaskId,
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
};

exports.getUserTasks = async (req, res) => {
    const { userId } = req.params;
}

try {
    const tasks = await userTaskService.getUserTasks(userId);
    res.json({ success: true, tasks })
} catch (error) {
    res.status(500).json({ success: false, error: error.message })
};

exports.updateUserTask = async (req, res) => {
    const { userTaskId, confirmed } = req.body
}

try {
    await userTaskService.updateUserTask(userTaskId, confirmed)
    res.status(200).json({
        success: true,
        message: 'userTask uppdaterad!',
    });
} catch (error) {
    res.status(500).json({ sucess: false, error: error.message })
}

exports.deleteUserTask = async (req, res) => {
    const { id } = req.params;

    try {
        await userTaskService.deleteUserTask(id);
        res.status(200).json({
            success: true,
            message: 'userTask raderad!'
        })
     } catch (error) {
            res.status(500).json({ success: false, error: error.message })
        }
    }


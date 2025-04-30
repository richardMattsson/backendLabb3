const taskService = require('../services/taskService');

exports.getTasks = (async(req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.json({tasks});
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.getTask = (async(req, res) => {
    const { taskId } = req.params;
    console.log("param" + taskId)
    
    try {
        const task = await taskService.getTask(taskId);
        res.json({task});
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.getTaskUserDetails = (async(req,res) => {
    const { taskId } = req.params;
    console.log("param" + taskId);

    try {
        const taskDetails = await taskService.getTaskUserDetails(taskId);
        res.json({taskDetails});
    } catch(error) {
        return res.status(500).json({
            error: error.message
        });
    }
})
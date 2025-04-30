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
});

exports.getTasksInCategory = (async(req, res) => {
    const { categoryId } = req.params;
    console.log("params " + categoryId );

    try {
        const tasksInCategory = await taskService.getTasksInCategory(categoryId);
        res.json({tasksInCategory});
    } catch {
        return res.status(500).json({
            error: error.message
        });
    }
})

exports.createTask = (async(req, res) => {
    const { title, description, date, address, price, taskCategoryId } = req.body;

    if (!title || title.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något titel för task',
        });
    }

    if (!address || address.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något adress för task',
        });
    }

    if (price <= 0.00 || !price) {
        return res.status(400).json({
            success: false,
            error: "Du har inte skrivit in något titel för uppgiften"
        })
    }

    if (!taskCategoryId) {
        return res.status(400).json({
            success: false,
            error: "Du har inte skrivit in categoryId för uppgiften"
        })
    }

    try{
        await taskService.createTask(title, description, date, address, price, taskCategoryId);
        return res.status(201).json({
            success: true,
            error: '',
            message: 'Du har lagt till en ny uppgift!'
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
})
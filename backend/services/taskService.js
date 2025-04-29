const connectionMySQL = require('../connectionMySQL')

function getTasks() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM task'
        connectionMySQL.query(sql, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

function getTask(taskId) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM task WHERE taskId = ?'
        connectionMySQL.query(sql, [taskId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

function getTaskUserDetails(taskId) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT task.title, task.description, task.date, task.address, task.price, task.status, userTask.userRole, u.firstName, u.email, userTask.confirmed FROM task INNER JOIN userTask ON task.taskId = userTask.userTaskTId INNER JOIN user u on userTask.userTaskUId = u.userId WHERE task.taskId = ?';
        connectionMySQL.query(sql, [taskId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        })
    })
}




module.exports = {
    getTasks,
    getTask,
    getTaskUserDetails,
    // getTaskInCategory,
    // createTask,
    // editTask,
    // deleteTask
}
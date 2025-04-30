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

function getTasksInCategory(categoryId) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT title, description, date, price, address, c.categoryName FROM task INNER JOIN category c on task.taskCategoryId = c.categoryId WHERE categoryId = ?';
        connectionMySQL.query(sql, [categoryId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

function createTask(title, description, date, address, price, taskCategoryId) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO task (title, description, date, address, price, taskCategoryId) VALUES (?, ?, ?, ?, ?, ?)';
        let params = [title, description, date, address, price, taskCategoryId];
        connectionMySQL.query(sql, params, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

function editTask(title, description, date, address, price, taskCategoryId, status, taskId) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE task SET title = ?, description = ?, date = ?, address = ?, price = ?, taskCategoryId = ?, status = ? WHERE taskId = ?';
        let params = [title, description, date, address, price, taskCategoryId, status, taskId];
        connectionMySQL.query(sql, params, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}

function deleteTask(taskId) {
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM task WHERE taskId = ?';
        connectionMySQL.query(sql, [taskId], (err) => {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}

module.exports = {
    getTasks,
    getTask,
    getTaskUserDetails,
    getTasksInCategory,
    createTask,
    editTask,
    deleteTask
}
const connection = require('../connectionMySQL');

function getUserTasks() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM userTask`;

    connection.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
function getUserTask(userId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM userTask WHERE userTaskUId = ?`;

    connection.query(sql, [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function createUserTask(userRole, userTaskTId, userTaskUId) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO userTask (userRole, userTaskTId, userTaskUId)
        VALUES (?, ?, ?)`;

    const params = [userRole, userTaskTId, userTaskUId];

    connection.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function confirmDoer(taskId, doerId) {
  return new Promise((resolve, reject) => {
    const sql = 'CALL ConfirmDoer(?, ?)';
    const params = [taskId, doerId];

    connection.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function updateUserTask(confirmed, userTaskId) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE userTask SET confirmed = ? WHERE userTaskId = ?';
    const params = [confirmed, userTaskId];

    connection.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// behöver spara userTaskId i params variabel
function deleteUserTask(userTaskId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM userTask WHERE userTaskId = ?';

    connection.query(sql, [userTaskId], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  getUserTasks,
  getUserTask,
  createUserTask,
  confirmDoer,
  updateUserTask,
  deleteUserTask,
};

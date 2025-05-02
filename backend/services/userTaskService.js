const connection = require('../connectionMySQL');

// behöver userTaskUId i parametern (inom parentesen)
function createUserTask(userRole, userTaskTId, confirmed) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO userTask (userRole, userTaskTId, userTaskUId, confirmed)
        VALUES (?, ?, ?, ?)`;

    const params = [userRole, userTaskTid, userTaskUId, confirmed];

    connection.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve({ userTaskId: result.insertId });
    });
  });
}

function getUserTasks(userId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM userTask WHERE userTaskUId = ?`;

    connection.query(sql, [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function updateUserTask(userTaskId, confirmed) {
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

    connection.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  createUserTask,
  getUserTasks,
  updateUserTask,
  deleteUserTask,
};

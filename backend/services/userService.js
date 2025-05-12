const connectionMySQL = require("../connectionMySQL")

function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user"
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user WHERE userId = ?"
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

function getUserTasksByRole(userId, taskrole) {
  return new Promise((resolve, reject) => {
    let sql = "";
    if (taskrole === "taskDoer") {
      sql =
        "SELECT t.taskId, t.title, t.date, t.status, userTask.confirmed, userTask.userrole FROM task t INNER JOIN userTask ON t.taskId = userTask.userTaskTId WHERE userTask.userTaskUId = ? AND userTask.userRole = ? ORDER BY t.datecreated DESC"
    }
    else if (taskrole === "taskCreator") {
      sql =
        "SELECT t.taskId, t.title, t.date, t.status, userTask.confirmed, userTask.userrole FROM user u INNER JOIN userTask ON u.userId = userTask.userTaskUId INNER JOIN task t on userTask.userTaskTId = t.taskId WHERE u.userId = ? AND userTask.userRole = ? ORDER BY t.datecreated DESC"
    }
    else {
      return reject(new Error("Ogiltlig roll, endast taskDoer eller taskCreator är giltiga"))
    }
    connectionMySQL.query(sql, [userId, taskrole], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user WHERE email = ? LIMIT 1"
    connectionMySQL.query(sql, [email], (err, results) => {
      if (err) return reject(err)
      else resolve(results[0])
    })
  })
}

function createUser(firstName, lastName, phone, email, city) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO user (firstName, lastName, phone, email, city) VALUES (?, ?, ?, ?, ?)"
    let params = [firstName, lastName, phone, email, city]
    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function updateUser(userId, updatedData) {
  return new Promise((resolve, reject) => {
    const { firstName, lastName, phone, city } = updatedData
    let sql =
      `UPDATE user SET firstName = ?, lastName = ?, phone = ?, city = ? WHERE userId = ?`
    let params = [firstName, lastName, phone, city, userId]
    connectionMySQL.query(sql, params, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
     }
    })
  })
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM user WHERE userId = ?"
    connectionMySQL.query(sql, [id], (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function getUserCount() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT COUNT(*) AS count FROM user"
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err)
      else resolve(rows[0].count)
    })
  })
}

module.exports = {
  getUsers,
  getUser,
  getUserTasksByRole,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserCount,
}

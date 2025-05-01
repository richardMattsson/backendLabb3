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

function updateUser(id, firstName, lastName, phone, email, city) {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE user SET firstName = ?, lastName = ?, phone = ?, email = ?, city = ? WHERE userId = ?"
    let params = [firstName, lastName, phone, email, city, id]
    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err)
      else resolve()
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}

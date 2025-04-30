const connectionMySQL = require("../connectionMySQL")

function getUser() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user"

    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

module.exports = {
    getUser,
  };

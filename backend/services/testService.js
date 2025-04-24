const connection = require('../connectionMySQL');

function getTest() {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM test';

    connection.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  getTest,
};

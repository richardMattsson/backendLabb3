const connection = require('../connectionMySQL');

function getCategories() {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM category';

    connection.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
function getCategory(categoryId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM category WHERE categoryId = ?';

    connection.query(sql, [categoryId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
function createCategory(categoryName, categoryImage) {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO category(categoryName, categoryImage)VALUES (?, ?)';
    let params = [categoryName, categoryImage];

    connection.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
function updateCategory(categoryName, categoryImage, categoryId) {
  return new Promise((resolve, reject) => {
    let sql =
      'UPDATE category SET categoryName = ?, categoryImage = ? WHERE categoryId = ?';
    let params = [categoryName, categoryImage, categoryId];

    connection.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
function deleteCategory(categoryId) {
  return new Promise((resolve, reject) => {
    let sql = 'DELETE FROM category WHERE categoryId = ?';

    connection.query(sql, [categoryId], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

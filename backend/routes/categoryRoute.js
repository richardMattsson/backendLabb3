const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/api/categories', categoryController.getCategories);
router.get('/api/categories/:categoryId', categoryController.getCategory);
router.post('/api/categories', categoryController.createCategory);
router.put('/api/categories', categoryController.updateCategory);
router.delete('/api/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;

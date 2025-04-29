const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryService.getCategory(categoryId);
    res.json({ category });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    await categoryService.createCategory(categoryName);
    return res.status(201).json({
      success: true,
      message: 'Du har skapat en ny kategori!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { categoryName, categoryId } = req.body;

  try {
    await categoryService.updateCategory(categoryName, categoryId);
    return res.status(201).json({
      success: true,
      message: 'Du har uppdaterat en kategori!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await categoryService.deleteCategory(categoryId);
    return res.status(201).json({
      success: true,
      message: 'Du har rederat en kategori!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

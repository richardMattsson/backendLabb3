const testService = require('../services/testService');

exports.getTest = async (req, res) => {
  try {
    const test = await testService.getTest();
    res.json({ test });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

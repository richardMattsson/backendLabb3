const userService = require("../services/userService")

exports.getUser = async (req, res) => {
  try {
    const users = await userService.getUser()
    res.json({ users })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fel vid hämtning av användare",
      error: error.message,
    })
  }
}

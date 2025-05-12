const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/api/users", userController.getUsers)
router.get("/api/users/:userId", userController.getUser)
router.get("/api/users/email/:email", userController.getUserByEmail)
router.get("/api/users/:userId/:taskrole", userController.getUserTasksByRole)
router.get("/api/user-count", userController.getUserCount)
router.post("/api/users", userController.createUser)
router.put("/api/users/:id", userController.updateUser)
router.delete("/api/users/:id", userController.deleteUser)

module.exports = router

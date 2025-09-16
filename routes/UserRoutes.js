const express = require("express")
const router = express.Router()
const userController = require("../controllers/UserController")
router.get("/users",userController.getUsers)

//http://localhost:3000/user/user/101
router.get("/user/:id",userController.getUserById)
router.post("/user",userController.addUser)
module.exports = router

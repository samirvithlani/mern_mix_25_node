const express = require("express")
const router = express.Router()
const userController = require("../controllers/UserController")
const testMiddeware = require("../middleware/TestMiddleware")
const requestMiddleware = require("../middleware/RequestMiddlewre")
const userValidationSchema = require("../validationschemas/userValidationSchema")
router.get("/users",userController.getUsers)

//http://localhost:3000/user/user/101
router.get("/user/:id",userController.getUserById)

//router.post("/user",testMiddeware,userController.addUser)
//router.post("/user",requestMiddleware,userController.addUser)
router.post("/user",requestMiddleware(userValidationSchema),userController.addUser)

router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
router.put("/addhobby/:id",userController.addHobby)
module.exports = router

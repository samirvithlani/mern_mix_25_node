const router = require("express").Router()
const uploadController = require("../controllers/UploadController")
router.post("/",uploadController.uploadFile)
module.exports = router
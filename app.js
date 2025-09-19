const express = require("express") //express module..
const mongoose  = require("mongoose")
const app = express()

//global middlware..
app.use(express.json()) //req.body json type excpet..

//require routes

const userRoutes = require("./routes/UserRoutes")
//app level.use
//app.use(userRoutes)
app.use("/user",userRoutes)

const roleRoutes = require("./routes/RoleRoutes")
app.use("/roles",roleRoutes)


//db connection...
mongoose.connect("mongodb://127.0.0.1:27017/mern_club_mix").then(()=>{
    console.log("database connected successfully!!")
})

//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
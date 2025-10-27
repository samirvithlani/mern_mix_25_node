const express = require("express") //express module..
const mongoose  = require("mongoose")
const app = express()
const Redis = require("ioredis")
const {Queue} = require("bullmq")

//global middlware..
app.use(express.json()) //req.body json type excpet..

//require routes

const userRoutes = require("./routes/UserRoutes")
//app level.use
//app.use(userRoutes)
app.use("/user",userRoutes)

const roleRoutes = require("./routes/RoleRoutes")
app.use("/roles",roleRoutes)

const uploadRoutes = require("./routes/UploadRoutes")
app.use("/upload",uploadRoutes)

//db connection...
mongoose.connect("mongodb://127.0.0.1:27017/mern_club_mix").then(()=>{
    console.log("database connected successfully!!")
})



//redis connection
const redisConnection = new Redis({
    host:"127.0.0.1",
    port:6379
})
//queue..
const myQueue = new Queue("taskQueue",{connection:redisConnection})

app.post("/set-batch",async(req,res)=>{
    const {name} = req.body
    await myQueue.add("task",{name},{delay:0})
    res.json({
        message:"batch set successfully..."
    })
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
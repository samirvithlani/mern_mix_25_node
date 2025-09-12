const express = require("express") //express module..
const mongoose  = require("mongoose")
const app = express()

const userModel = require("./models/UserModel") //userModel == userSchema == db.users



//APIS
//http:localhost:3000/test
app.get("/test",(req,res)=>{
    console.log("test api called...")
    res.send("TEST API CALLED....")
})

const user = {
    id:1,
    name:"ram",
    age:23
}
app.get("/user",(req,res)=>{

    //res.json(user)
    res.json({
        data:user,
        message:"user get successfully !"
    })
})

var users = [
    {
        id:1,
        name:"ram",
        age:23
    },
    {
        id:2,
        name:"shyam",
        age:24
    },
    {
        id:3,
        name:"amit",
        age:25
    }
]

app.get("/users",(req,res)=>{
    res.json({
        data:users,
        message:"all users fetched successfully"
    })
})

app.get("/usersfromdb",async(req,res)=>{

    //databse....
    //db.users.find
    const users = await userModel.find()
    console.log(users)
    res.json({
        message:"users fetched..",
        data:users
    })


})

//db connection...
mongoose.connect("mongodb://127.0.0.1:27017/mern_club_mix").then(()=>{
    console.log("database connected successfully!!")
})

//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
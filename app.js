const express = require("express") //express module..
const app = express()



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



//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
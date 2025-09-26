const mongoose = require("mongoose")
const Schema = mongoose.Schema // class

const userSchema = new Schema(
    {
    //filed...
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    },
    hobbies:[
        {
            type:String,
        }
    ],
    bloodGroup:{
        enum:["A+","A-","O+","O-"],
        type:String
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"role"

    },
    file:{
        type:String
    }
},{
    timestamps:true
})
//users == collection
//if collection is not exist it will create...


// mongoose.model("users",userSchema)
// //app.js -- expoer
// module.exports = userSchema

module.exports = mongoose.model("users",userSchema)
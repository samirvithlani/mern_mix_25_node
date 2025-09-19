const mongoose = require("mongoose")
const Schema  = mongoose.Schema
const roleModel = new Schema({
    name:{
        type:String,
    }
},{
    timestamps:true
})

//mern_club_mix --role
module.exports = mongoose.model("role",roleModel)
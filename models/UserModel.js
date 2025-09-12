const mongoose = require("mongoose")
const Schema = mongoose.Schema // class

const userSchema = new Schema({
    //filed...
})
//users == collection
//if collection is not exist it will create...


// mongoose.model("users",userSchema)
// //app.js -- expoer
// module.exports = userSchema

module.exports = mongoose.model("users",userSchema)
const userModel = require("../models/UserModel");

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({
    message: "user fetched..",
    data: users,
  });
};
const getUserById = async (req, res) => {
  //queryParams
  // //params
  // console.log("req.params",req.params)
  // const id = req.params.userId;
  // console.log('id',id)

  //db.users.find({_id:Objectid(req.params.id)})
  //userMode.find({})
  //const foundUser = userModel.find({_id:ObjectId(req.params.id)}) // []
  const foundUser = await userModel.findById(req.params.id); // {}
  if (foundUser) {
    res.json({
      message: "user found with criteria",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found with criteria",
      data: null,
    });
  }
};

//req.params
//req.query
//req.body
//req.headers


// const addUser = async(req,res)=>{

//   console.log("req body",req.body)
//   //db.users.insert({})
//   //db.users.insert(req.body)
//   //userModel.insert(req.body)

//   //mongoose--orm
//   const savedUser = await userModel.create(req.body)
//   res.json({
//     message:"user saved successfully !!",
//     data:savedUser
//   })

// }

const addUser = async(req,res)=>{

  console.log("req body",req.body)
  
  try{
  const savedUser = await userModel.create(req.body)
  res.json({
    message:"user saved successfully !!",
    data:savedUser
  })
}catch(err){
  res.json({
    message:"error while adding user",
    err:err
  })
}

}


module.exports = {
  getUsers,
  getUserById,
  addUser
};

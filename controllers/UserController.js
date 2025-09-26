const userModel = require("../models/UserModel");

const getUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId", "name");
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

const addUser = async (req, res) => {
  console.log("req body", req.body);
  console.log("req body", req.file);
  //file upload.. path -- db store/..

  try {
    //const savedUser = await userModel.create(req.body);
    const savedUser = await userModel.create({...req.body,file:req.file.path});

    //mailsend(savedUser.email,"","")
    res.json({
      message: "user saved successfully !!",
      data: savedUser,
    });
  } catch (err) {
    res.json({
      message: "error while adding user",
      err: err,
    });
  }
};

const deleteUser = async (req, res) => {
  //delete from table where id = ?
  //db.users.remove({_id:"id....."})
  //userModel.remove(id)
  //apply if
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "user deleted !",
    data: deletedUser,
  });
};

const updateUser = async (req, res) => {
  //udpate table set name= ?,... where id = ?
  //db.users.update({$set:{}},id)
  const id = req.params.id;
  //const updatedUser  = await userModel.findByIdAndUpdate(id,req.body) //it will return ol data
  const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    message: "user updated successfully!!",
    data: updatedUser,
  });
};

const addHobby = async (req, res) => {
  //if hobby is exist send error message that this hobby is already exist !!
  const id = req.params.id;
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { $push: { hobbies: req.body.hobby } },
    { new: true }
  );
  res.json({
    message: `new hobby ${req.body.hobby} added successfully...`,
    data: updatedUser,
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  addHobby,
};

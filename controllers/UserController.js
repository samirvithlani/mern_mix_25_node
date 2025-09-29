const userModel = require("../models/UserModel");
const cloudinaryUtil = require("../utils/cloudinaryUtil")
const bcrypt = require("bcrypt")

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
  console.log("req body", req.body); // password --> plain password
  console.log("req body", req.file);
  //file upload.. path -- db store/..

  try {
    const hashedPassword = bcrypt.hashSync(req.body.password,10)
    req.body.password = hashedPassword // req.body password has been replaced by hashedPassword
    //const savedUser = await userModel.create(req.body);
    const cloudinaryResponse = await cloudinaryUtil.uploadToCloud(req.file.path)
    //console.log("cloundiary res..",cloudinaryResponse)
    // const savedUser = await userModel.create({...req.body,file:req.file.path});
    const savedUser = await userModel.create({...req.body,file:cloudinaryResponse.secure_url});

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

const loginUser = async(req,res)=>{

  const {email,password} = req.body;
  console.log(password)
  //const foundUser = await userModel.find({email:email,password:password}) //fail..
  const foundUserFromEmail = await userModel.findOne({email:email}) //[] //{}
  console.log(foundUserFromEmail)
  if(foundUserFromEmail){
    //{} --object db... hashedPassword
    if(bcrypt.compareSync(password,foundUserFromEmail.password)){
       res.status(200).json({
        message:"user found",
        data:foundUserFromEmail
       })
    }
    else{
      res.status(401).json({
        message:"invalid cred",
      })
    }
  }
  else{
    res.status(404).json({
      message:"user not found.."
    })
  }
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  addHobby,
  loginUser
};

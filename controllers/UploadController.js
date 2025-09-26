const multer = require("multer")

const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype =="image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
            cb(null,true) //accept
        }
        else{
            cb(new Error("only images are allowd"),false) //no accept
        }
    }
}).single("file") //filedName
//any array



const uploadFile =(req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            res.json({
                message:"error while uploading file...",
                err:err.message
            })
        }
        else{
            res.json({
                message:"file uploaded successfully1!",
                file:req.file
            })
        }
    })

}

module.exports= {
    uploadFile
}
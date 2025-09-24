const multer = require("multer")

const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname )
    }
})

const upload = multer({
    storage:storage,
    //fileFilter:
}).single("file") //filedName

const uploadFile =(req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            res.json({
                message:"error while uploading file...",
                err:err
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
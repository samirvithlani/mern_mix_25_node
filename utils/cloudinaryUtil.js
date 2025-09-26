const cloudinary = require("cloudinary").v2;

const uploadToCloud = async(path)=>{

    cloudinary.config({
        api_key:"",
        cloud_name:"",
        api_secret:""
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(path)
    return cloudinaryResponse
}
module.exports = {uploadToCloud}
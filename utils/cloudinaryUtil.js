const cloudinary = require("cloudinary").v2;

const uploadToCloud = async(path)=>{

    cloudinary.config({
        api_key:"292199526794599",
        cloud_name:"dpjoxqisl",
        api_secret:"KKZHWhEwjA1Q0zUx4gVfcsvcVRY"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(path)
    return cloudinaryResponse
}
module.exports = {uploadToCloud}
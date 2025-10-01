const jwt = require("jsonwebtoken")
const secret = "samir"

const verifyUser = async(req,res,next)=>{

    //token -->
    const token = req.headers.authorization
    if(token){
        if(token.startsWith("Bearer ")){
            
            //Bearer adklmasklmcanjasancslsanskajsnasjkn
            const token2 = token.split(" ")[1]
            console.log(token2)
            try{
                const user = jwt.verify(token2,secret)
                req.user = user // controller -- user
                next()

            }catch(err){
                res.json({
                    message:"invalid token",
                    err:err
                })
            }
        }else{
            res.status(401).json({
                message:"Not Bearer token"
            })
        }

    }else{
        res.status(401).json({
            message:"token is missing.."
        })
    }


}
module.exports = {
    verifyUser
}
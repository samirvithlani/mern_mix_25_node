const testMiddeware = async(req,res,next)=>{

    
    
    if(req.body == undefined){
        
        res.json({
            message:"req body is required.."
        })
    }
    else{
        next()
    }


}
module.exports = testMiddeware
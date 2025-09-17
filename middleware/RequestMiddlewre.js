
// //zod
// const userValidationSchema = require("../validationschemas/userValidationSchema")

// const requestMiddleware = async(req,res,next)=>{
    
//     try{
//         await userValidationSchema.parseAsync(req.body)
//         next()
//     }catch(err){
//         res.json({
//             message:"invalid data",
//             err:err
//         })
//     }

// }

// module.exports = requestMiddleware


//zod



const requestMiddleware =(schema)=> async(req,res,next)=>{
    
    try{
        await schema.parseAsync(req.body)
        next()
    }catch(err){
        res.json({
            message:"invalid data",
            err:err
        })
    }

}

module.exports = requestMiddleware
const jwt=require('jsonwebtoken');
const User=require("../models/customer");

const authMiddleware=async(req,res,next)=>{
        const token=req.header("Authentication");

        if(!token){
            return res.status(401).json({msg:"Unauthorized HTTP, Token not provided"});
        }


        
        const jwtToken=token.replace("Bearer","").trim();
        console.log("token middleware ",jwtToken);
        


        try{
            const isVerified=jwt.verify(jwtToken,"world");
            console.log(isVerified);

            const userData=await User.findOne({email:isVerified.email}).select({password:0});
            console.log(userData);

            req.user=userData;
            req.token=token;
            req.userId=userData._id;
        }
        catch(error){
            res.status(401).json({msg:"Unauthorized HTTP, Token not provided"});
        }
        next();
}

module.exports=authMiddleware;
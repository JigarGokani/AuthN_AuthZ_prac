// auth,isStudent,isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth middleware
exports.auth = (req,res,next)=>{
    try{
        // extracting the token-3 WAYS-
        // By header,by body or by cookie
        const token = req.body.token;

        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token not found",
            })
        }

        // verify/decode the token 
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
    
            req.user = decode;
    
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        next();

    }
    catch(error){
        return res.status(402).json({
            success:false,
            message:"Something went wrong while verifying the token!"
        })

    }

}
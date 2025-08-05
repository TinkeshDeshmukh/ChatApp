import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute =async(req,res,next)=>{
    
    try {
        const token=req.cookies.jwt
        // console.log(token);
        
        if(!token){
            return res.status(401).json({message:"Not authorized, No token found"})
        }
        const decode =jwt.verify(token,process.env.JWT_SECRETE)
        if(!decode){
            return res.status(401).json({message:"Unauthorized,Invalid token"})
        }
        
        const user =await User.findById(decode.userID).select("-password")
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        
        req.user=user;
        next()
    } catch (error) {
        console.log("error in protect middleware"+error.message);
        
    }
}
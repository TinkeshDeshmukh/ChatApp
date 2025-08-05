import JWT from "jsonwebtoken"
export const generatetoken =async(userID,res)=>{
 const token =JWT.sign({userID},process.env.JWT_SECRETE,{
    expiresIn:"7d"
 })
 res.cookie("jwt",token,{
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    samesite:"strict",
    secure:process.env.NODE_ENV!=="development",
 })
 return token;
}
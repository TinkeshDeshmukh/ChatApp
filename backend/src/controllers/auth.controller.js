import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generatetoken } from "../lib/util.js"
import cloudinary from "../lib/cloudinary.js"
export const signup= async (req,res)=>{
    try {
        console.log(req.body);
        
        
        const {fullname,email,password}=req.body
        console.log("yes1");

        if(password.length<6){
            return res.status(400).json({message:"Password have at least 6 characters"})
        }
            const user = await User.findOne({email});
            console.log("user",user);
            

            if(user){
                return res.status(400).json({message:"User already exist"})
            }
        console.log("yes2");



            const hashedPassword =await bcrypt.hash(password,10);
            const  newUser =await User.create({
                email:email,
                fullname:fullname,
                password:hashedPassword,
            })
            console.log("yes3");
            if(newUser){
                generatetoken(newUser._id,res)
                await newUser.save()
                res.status(201).json({
                    _id:newUser._id,
                    fullname:newUser.fullname,
                    email:newUser.email,
                    profilePic:newUser.profilepic
                })
            }

    } catch (error) {
        console.log("Error in signup controller: " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist=await User.findOne({email})
        if(!userExist){
            return res.status(404).json({message:"Invalid Credentials"})
        }
        const isPassCorrect =await bcrypt.compare(password,userExist.password)
        if(!isPassCorrect){
            return res.status (404).json({message:"Invalid Credentials"})
        }
        generatetoken(userExist._id,res);
        res.status(200).json({
            _id:userExist._id,
            fullname:userExist.fullname,
            email:userExist.email,
            profilePic:userExist.profilepic
        })
    } catch (error) {
        console.log("Login Controller"+error.message);
        
    }
}
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0}) 
        res.status(200).json({message:"Logout Sucessfully"})
    } catch (error) {
        console.log("logout Controller"+error.message);
        
    }
}
export const updateProfile=async (req,res)=>{
    try {
         const {profilepic}=req.body
             
    const userID=req.user._id
    if(!profilepic){
        return res.status(400).json({message:"Profile Pic is Reuired"})
    }
    const uploadedImage=await cloudinary.uploader.upload(profilepic)
    const updatedUser=await User.findByIdAndUpdate(userID,{profilepic:uploadedImage.secure_url},{new:true})
    res.status(200).json(updatedUser )
        
    } catch (error) {
        console.log("error in update contoller"+error.message);
        
    }
   
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller: " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
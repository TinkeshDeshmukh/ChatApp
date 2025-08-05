import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
export const getUserForSideBar = async (req, res) => {
    try {
        
        const loggedInUserId = req.user._id;
        
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error fetching users for sidebar:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getMessages = async (req, res) => {
    try {
        const {id:UserId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderID:myId,receiverID:UserId},
                {senderID:UserId,receiverID:myId}
            ]
        })
        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal Server Error" }); 
    }

}
export const sendMessage = async (req, res) => {
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        // console.log("in server");
        
        if(image){
            const uploadedImages=await cloudinary.uploader.upload(image);
            imageUrl=uploadedImages.secure_url;
            // console.log("img");
            
        }
        const newMessage = new Message({
            senderID: senderId,
            receiverID: receiverId,
            text:text,
            image: imageUrl || ""
        });
        await newMessage.save();
        
        // realtime functionality using socket.io 
        const reciever =getReceiverSocketId(receiverId)
        if(reciever){
            io.to(reciever).emit("newMessage",newMessage)
        }


        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error sending message:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

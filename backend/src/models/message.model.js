import { text } from "express";
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    senderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiverID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text:{
        type: String,
    },
    image:{
        type: String,
        default: ""
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;

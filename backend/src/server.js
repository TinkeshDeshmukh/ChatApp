import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv"
import { connectdb } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRoute from "./routes/message.route.js";
import cors from "cors"
import { app, io, server } from "./lib/socket.js";
import path from "path";
dotenv.config({path:"../.env"});

const port =process.env.PORT
const __dirname=path.resolve();
app.use(cors({
    origin:"http://localhost:5173", 
    credentials:true 
})) 
app.use(express.json({limit:"50mb"}));
app.use(cookieParser()); 

// Routes 

app.use("/api/auth",authRoute);
app.use("/api/messages",messageRoute);
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}
server.listen(port,()=>{
console.log(`active on ${port}`);
connectdb();
})
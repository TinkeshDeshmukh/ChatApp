import mongoose from "mongoose"
export const connectdb =async()=>{
    await mongoose.connect(process.env.Mongo_URL).then(()=>{
        console.log("Connected DB");
    }).catch((err)=>{
        console.log(err.message);
        
    })
}
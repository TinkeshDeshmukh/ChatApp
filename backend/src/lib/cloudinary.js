import {v2 as cloudinary} from "cloudinary"
import {config} from "dotenv"
config({path:"../.env"})

cloudinary.config({
    cloud_name:process.env.Cloudinary_Name,
    api_key:process.env.Cloudinary_ApiKey,
    api_secret:process.env.Cloudinary_ApiSecrete
})
export default cloudinary
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();
 
console.log(process.env.CLOUDINARY_API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (path) => {
   try {
    if (!path) return null;

    const result = await cloudinary.uploader.upload(path, {
      resource_type: "auto"
    });

    fs.unlinkSync(path);

    return result.secure_url;

  } catch (error) {
    if (path) fs.unlinkSync(path);
    console.error("Cloudinary Error:", error);
    return null;
  }
}
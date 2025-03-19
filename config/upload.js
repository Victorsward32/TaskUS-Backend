import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js"; // Import Cloudinary config

// 🟢 Storage for general uploads
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads", // Cloudinary folder
        allowed_formats: ["jpg", "png", "jpeg", "gif"],
    },
});

// 🟢 Storage for activity uploads
const activityStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "activityUploads", // Cloudinary folder
        allowed_formats: ["jpg", "png", "jpeg", "gif"],
    },
});

// 🟢 Filter file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

export const upload = multer({ storage, fileFilter });
export const activityUploads = multer({ storage: activityStorage, fileFilter });

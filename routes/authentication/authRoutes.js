import express from "express";
import {forgotPassword, loginUser, registerUser, resetPassword, updateProfilePhoto} from "../../controllers/authController.js";
import { upload } from "../../config/upload.js";


const authRouter = express.Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post("/upload-photo", upload.single("profilePhoto"), updateProfilePhoto);
export default authRouter;
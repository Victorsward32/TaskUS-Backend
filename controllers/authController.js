import { sendOTPEmail } from "../config/email.js";
import { generateToken } from "../config/jwt.js";
import User from "../models/authentication/userModel.js";
// import generateToken from '../config/jwt.js'
import colors from 'colors'
import crypto from 'crypto'
import bcrypt from "bcryptjs";

/***
 *  Destination - Register new user
 *  Route - POST /api/auth/register
 */

export const registerUser = async (req,res)=>{
    const {username,email,password}=req.body;
    try {
        //check if user already exist or not
        const existingEmail=await User.findOne({email});
        const existingUsername=await User.findOne({username});

        if(existingEmail){
            return res.status(400).json({message:'Users Email alredy exist'})
        }
        if(existingUsername){
            return res.status(400).json({message:'Users Username alredy exist'})
        }

        //create a new user 
        const user = await User.create({ username, email, password });

        if(user){
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email:user.email,
                token:generateToken({id:user._id})
            });
        }else{
            res.status(400).json({
                message:'Invalid user data'
            })
        }
        
    } catch (error) {
        res.status(500).json({message:'Server error (authcontroller-r)', error: error.message})
        console.log(colors.red.bold(`auth controll Error:${error.message} `));
        
    }
}

/**
 * Destination   Login user & get token
 * Route   POST /api/auth/login
 */

// export const loginUser= async (req,res)=>{
//     const{username,password}=req.body;
//     try {
//         const user=await User.findOne({username});

//         if(!user || !(await user.matchPassword(password))){

//             return res.status(401).json({message:'Invalid Username or Password'})
//         } 
//         res.status(200).json({
//             _id:user._id,
//             username:user.username,
//             email:user.email,
//             token:generateToken({id:user._id})
//         })
//     } catch (error) {
//         res.status(500).json({message:'Server error(authController-l',error:error.message})
//         console.log(colors.red.bold(`auth controll Error:${error.message} `)); 
//     }
// }
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }

        // Check if password matches using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }

        // Send response with token
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken({ id: user._id })
        });
    } catch (error) {
        res.status(500).json({ message: "Server error (authController-l)", error: error.message });
        console.log(colors.red.bold(`Auth Controller Error: ${error.message}`));
    }
};


/**
 * @desc   Generate OTP & Send Email
 * @route  POST /api/auth/forgot-password
 */
export const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        //Generate 6-digit OTP
        const otp=crypto.randomInt(100000,999999).toString();
        user.otp=otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; 

        await user.save();

        // Send OTP to user's email
        await sendOTPEmail(email, otp);
        
        res.status(200).json({ message: "OTP sent to email." });
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message })
    }
}

/**
 * @desc   Verify OTP & Reset Password
 * @route  POST /api/auth/reset-password
 */
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // // Ensure password is hashed only once
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Just set the plain password - let the pre-save hook handle the hashing
        user.password = newPassword;

        // Clear OTP fields
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successfully. You can now log in with your new password." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


/**
 * @desc   Upload Profile Photo
 * @route  POST /api/auth/upload-photo
 */
export const updateProfilePhoto = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log('uploads: ',user);
        

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePhoto = req.file.path; // Save image path
        await user.save();

        res.status(200).json({ message: "Profile photo updated", profilePhoto: user.profilePhoto });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// const authController={registerUser,loginUser}
// export default authController;
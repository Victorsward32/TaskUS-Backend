import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//define user schema 
const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto:{ 
        type: String,
        default: "" },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    }
}, {
    timestamps: true  // automatically adds created & updated fields
});

//------Method convert password into hash password before saving ----------//
userScheme.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

//------- Method to compare password ---------//
userScheme.methods.matchPassword=async function (enteredPassword) {
    const checkPassword=await bcrypt.compare(enteredPassword,this.password);
    return checkPassword;
}

const User= mongoose.model("User",userScheme);

export default User;
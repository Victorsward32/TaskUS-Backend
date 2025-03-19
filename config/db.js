import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
// import colors from "colors"

//load environment variable from .env
dotenv.config();
const uri=process.env.MONGODB_URI;
const connectDB= async ()=>{
    try {
        const conn=await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(colors.red.bold(`Error : ${error.message}`));
        process.exit(1);// Exit process with failure 
    }
}

export default connectDB;
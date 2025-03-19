import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import colors from "colors"

dotenv.config();

//configure email transporter
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendOTPEmail =async(email,otp)=>{
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🔐 Your One-Time Password (OTP) for Secure Access",
            text: `
            Dear User,
                   
            We received a request to verify your account. Please use the following One-Time Password (OTP) to proceed:
            🔢 OTP: ${otp}
            This OTP is valid for only **10 minutes**. Please do not share this code with anyone for security reasons.
            If you did not request this, please ignore this email.
            
            Best regards,  
            digiCraft solutions  
            Customer Support Team  
        `,
        
        })
        
        console.log(colors.green.bold('OTP sent successfully!'));
        
    } catch (error) {
        console.log(colors.red.bold(`Error sending OTP`));
        
    }
}
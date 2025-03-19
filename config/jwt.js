import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const SECRET_KEY=process.env.JWT_SECRET;
const EXPIRES_IN=process.env.EXPIRY

/****
 * Generate JWT Token 
 */
export const generateToken=(payload)=>{
    const token=jwt.sign(payload,SECRET_KEY,{expiresIn:EXPIRES_IN});
    return token
}

export const VerifyToken=(token)=>{
    try {
        const result=jwt.verify(token,SECRET_KEY);
        return result;
        
    } catch (error) {
        console.log(colors.red.bold(`JWT Verification Error::${error.message}`))
    }

    return null;
}



// export default {generateToken,VerifyToken}
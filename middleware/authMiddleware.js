import {VerifyToken} from '../config/jwt.js'

/***
 * Middleware to protect routes
 */
export const authMiddleware = async (req,res,next)=>{
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1]; 

    if(!token){
        return res.status(401).json({
            message:'No token, authorization denied'
        })
    }

    const decoded=VerifyToken(token);

    if(!decoded){
        return res.status(401).json({
            message:'Invalid or expired token'
        })
    }
    // Attach user data to request
    req.user=decoded;
    next();
}



// export default authenticate;
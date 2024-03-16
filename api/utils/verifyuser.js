import  Jwt  from "jsonwebtoken";
import {errorHandler} from "./error.js";

export const verifyuser = (req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401,"There is no registered user"))
    }
    Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if (err) {
            return next(errorHandler(401,"Unothorized user"))
        }
        req.user = user;
        next()
    })
}
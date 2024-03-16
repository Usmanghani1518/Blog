import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.models.js"

export const testApi = (req,res)=>{
    res.json({message:"api is wrking in the well format"})
}
export const  updateUser =  async (req,res,next)=>{
console.log(req.user);
     
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(401,"You are not authorized to perform this action"));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(401,"The password must be greater than the  six characters"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }
    
    if (req.body.username) {
        let user= await User.findOne({username:req.body.username})
        if (user) {
           return next(errorHandler(403,"This username is already exist")) 
        }
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(401,"username must be greater than the 7 and less than the 20"))
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(401, 'Username should not contain any space'))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(401,"Username must be lowercase"))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(401,"username does not contain any special character"))
        }
    }
    if (req.body.email) {
        const email = await User.findOne( {email:req.body.email});
        if (email) {
            return next(errorHandler(403,"This email is already exist"))
        }
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                avatar:req.body.avatar
            }
        },{new:true});
        const {password,...rest} =updateUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
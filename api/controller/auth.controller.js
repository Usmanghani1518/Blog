import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
export const signup = async (req,res,next)=>{

    const {username,email,password} = req.body;
    if (!username || !email || !password || username==="" || email==="" || password==="") {
        return next(errorHandler(400,"All fields are required"))
    }
     const hashPassword = bcrypt.hashSync(password,10);
     const newUser = new User({
        username,
        email,
        password:hashPassword
     })

    try {
        await newUser.save()
        res.status(200).json({msg:"user has been created successfully"})
    } catch (error) {
      next(errorHandler(400,"this user is already exist in the database stacks"))
    }
  
}
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ msg: "user has been created successfully" });
  } catch (error) {
    next(
      errorHandler(400, "this user is already exist in the database stacks")
    );
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email == "" || password == "") {
   return  next(errorHandler(400, "Email and password are required"));
  }
  try {
    const validateUser = await User.findOne({ email });
    if (!validateUser) {
     return next(errorHandler(404, "There is no register account plz signup "));
    }
    const validatePassword = bcrypt.compareSync(
      password,
      validateUser.password
    );
    if (!validatePassword) {
     return next(errorHandler(404, "the password is incorrect"));
    }
    const expireTime = new Date(Date.now()+2*24*60*60*1000)
    
    const token = jwt.sign({ id: validateUser._id ,isAdmin:validateUser.isAdmin}, process.env.JWT_SECRET);
    const{password:pass,...rest}= validateUser._doc;
   return res.status(200).cookie("access_token",token,{httpOnly:true,expires:expireTime,secure:true}).json(rest)
  } catch (error) {
    next(error);
  }
};

export const authGoogle = async(req,res,next)=>{
  const {name, email, avatar} = req.body;
  try {
      let user = await User.findOne({ email });
     
      const expireTime = new Date(Date.now()+2*24*60*60*1000)
      if (user) {

          const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET);
          const { password, ...rest } = user.toJSON(); // Use toJSON() to convert Mongoose document to plain JavaScript object
          return res.status(200).cookie("access_token", token, {
              httpOnly: true,
              expires:expireTime,
              secure:true
          }).json(rest);
      } else {
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
          const newUser = new User({
              username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
              email,
              password: hashedPassword,
              avatar,
          });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id ,isAdmin:newUser.isAdmin }, process.env.JWT_SECRET);
          const { password, ...rest } = newUser.toJSON(); // Use toJSON() to convert Mongoose document to plain JavaScript object
          return res.status(200).cookie("access_token", token, {
              httpOnly: true,
              expires:expireTime,
              secure:true
          }).json(rest);
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};




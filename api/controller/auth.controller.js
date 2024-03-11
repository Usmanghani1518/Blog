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
    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET);
    const{password:pass,...rest}= validateUser._doc;
   return res.status(200).cookie("access_token",token,{httpOnly :true}).json(rest)
  } catch (error) {
    next(error);
  }
};

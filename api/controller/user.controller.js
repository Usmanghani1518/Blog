import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.models.js";
import e from "express";

// this is for the checking the dummy api is working or not it has no role in our project 
export const testApi = (req, res) => {
  res.json({ message: "api is wrking in the well format" });
};

// Here we update the user with put request and update his avatar ,username and password

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(401, "You are not authorized to perform this action")
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(
          401,
          "The password must be greater than the  six characters"
        )
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return next(errorHandler(403, "This username is already exist"));
    }
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(
          401,
          "username must be greater than the 7 and less than the 20"
        )
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(401, "Username should not contain any space"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(401, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(401, "username does not contain any special character")
      );
    }
  }
  if (req.body.email) {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return next(errorHandler(403, "This email is already exist"));
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Here we going to delete the user from our dataBase and front-end and clear his cookies
export const deleteUser = async (req,res,next)=>{
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403,"You are not  allowed to Delete Account"))
  }
  
    try {
      await User.findByIdAndDelete(req.params.userId)
      res.clearCookie("access_token")
      res.status(200).json({message:"user is deleted Successfully"})
    } catch (error) {
      next(error)
    }
  }
// Here we are going to signout the user 
export const signOut = async (req,res)=>{
  res.clearCookie("access_token").status(200).json({message:"user  has been signed out successfully"});
}
// this api is used for get the value of all users 
export const getUser = async (req,res,next)=>{
  if (!req.user.isAdmin || req.params.userId !== req.user.id) {
    return next(errorHandler(403,"Your are not allowed to see these users"))
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sortDirection === "des" ? 1:-1;
    const users = await User.find().skip(startIndex).limit(limit).sort({createdAt:sortDirection}).select("-password");
    const nowDate = new Date();
    const lastMonthUser = new Date(nowDate.getFullYear(),nowDate.getMonth()-1,nowDate.getDate())
    const countLastMonthUser = await User.countDocuments({createdAt:{ $gte:lastMonthUser}})
    const totalUser = await User.countDocuments();
    res.status(200).json({users,countLastMonthUser,totalUser})
  } catch (error) {
    next(error)
  }
}
// delete the user account by an admin 
export const deleteUserByAdmin = async ( req,res,next)=>{
 if (!req.user.isAdmin || req.params.adminId !== req.user.id) {
  return next(errorHandler(403,"You are not allowed to do this "))
 }
 try {
  await   User.findByIdAndDelete(req.params.userId);
  return res.status(200).json({message:"user is deleted successfully"})
 } catch (error) {
  next(error)
 }
}
// send the notification to the user 
export const notificationToUser = async (req,res,next)=>{
  if (!req.user.isAdmin || req.user.id !== req.params.adminId) {
   return next(errorHandler(403,"You are not allowed to do this action"))
  }
  try {
    const user = User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(403,"Ther is no user with longer"))
    }
   await User.findByIdAndUpdate(req.params.userId,{notification:req.body.content})
   return res.status(200).json("notification send successfully")
  } catch (error) {
    next(error)
  }
}

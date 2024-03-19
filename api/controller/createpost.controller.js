import { errorHandler } from "../utils/error.js"
import {Post } from '../models/post.model.js'

export const CreatePost = async (req,res,next)=>{
    if (!req.user.isAdmin) {
        return next(errorHandler(403,"This is not valid for create post"))
    }
    if (!req.body.tittle || !req.body.content) {
        return next(errorHandler(403,"All fields are required for this "))
    }
    const slug = req.body.tittle.split(' ').join("-").toLowerCase().replace(/[^a-zA-Z0-9\-]/g, '');
    const newPost = new Post ({
        ...req.body,slug,userId:req.user.id
    });
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost)
    } catch (error) {
        next(error)
        
    }
}
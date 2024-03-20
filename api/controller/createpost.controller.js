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

export const getPost = async (req,res,next)=>{
    try {
        const startIndex= parseInt(req.query.startIndex)|| 0 ;
        const limit = parseInt(req.query.limit) || 9 ;
        const direction = req.query.order === "des" ?1:-1 ;

        const  post= await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchTerm && {$or:[
                {tittle:{$regex:req.query.searchTerm ,$options:"i"}},
                {content:{$regex:req.query.serchTerm,$options:"i"}}
            ]}),

        }).sort({updateAt:direction}).skip(startIndex).limit(limit)
        const totalPosts = await Post.countDocuments()
        const now = new Date();
        const lastOneMonth = new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
        const lastMonthPost = await Post.find({createdAt:{$gte:lastOneMonth}})
        return res.status(200).json({
            post,
            totalPosts,
            lastMonthPost
        })

    } catch (error) {
        next(error)
    }
}
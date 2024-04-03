import { errorHandler } from "../utils/error.js"
import Post  from '../models/post.model.js'

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
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403,"You are not allowed to see the posts"))
    }
    try {
        const startIndex= parseInt(req.query.startIndex)|| 0 ;
        const limit = parseInt(req.query.limit) || 9 ;
        const direction = req.query.order === "des" ? 1 :-1 ;
        const search = req.query.searchTerm &&  req.query.searchTerm.toString()

        const  post= await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category  && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchTerm && {$or:[
                {tittle:{$regex:search ,$options:"i"}},
                {content:{$regex:search,$options:"i"}}
            ]}),

        }).sort({updatedAt:direction}).skip(startIndex).limit(limit)
        const totalPosts = await Post.countDocuments()
        const now = new Date();
        const lastOneMonth = new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
        const lastMonthPost = await Post.find({createdAt:{$gte:lastOneMonth}})
        // const userPost = await Post.find().sort({updatedAt:direction}).skip(startIndex).limit(limit)
        return res.status(200).json({
            post,
            totalPosts,
            lastMonthPost,
            // userPost
        })

    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req,res,next)=>{
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler("This user in not authenticate to do this"))
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
         res.status(200).json({message:"This post is deleted successfully"})
    
    } catch (error) {
        next(error)
    }
}

export const updatePost  = async (req,res,next)=>{
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403,"You are not authorized to perform this action"));       
    }
    let update = await Post.findByIdAndUpdate(req.params.postId,{
        $set:{
            tittle:req.body.tittle,
            content:req.body.content,
            postImg:req.body.postImg,
            category:req.body.category
        }
    },{new:true})
    return res.status(200).json(update)
}


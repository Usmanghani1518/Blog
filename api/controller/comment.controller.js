import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const { content, userId, postId } = req.body;
  if (!userId || !postId) {
    return next(errorHandler(403, "userId and postId is required"));
  }
  if (req.user.id !== userId) {
    return next(errorHandler(403, "You are not allowed to create comments"));
  }
  if (!content || content.trim() == "") {
    return next(errorHandler(403, "Comment is required and  cannot be empty"));
  }

  try {
    const comment = await new Comment({
      content,
      owner: userId,
      postId,
    }).save();
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req,res,next)=>{
  if (req.user.id !== req.params.userId ) {
    return next(errorHandler(403,"you are not allowed to see the comment"))
  }
  const sortDirection = -1;
  const startIndex = parseInt(req.query.startIndex )|| 0;
  try {
    const comment = await Comment.find({postId:req.params.postId}).populate({path:"owner",select:"-password"}).sort({createdAt:sortDirection}).limit(5).skip(startIndex)
    const totalComments = await Comment.countDocuments({postId :req.params.postId})
    return res.status(200).json({comment,totalComments})
  } catch (error) {
    next(error)
  }
}


export const likeComment = async (req, res, next) => {
  try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
          return next(errorHandler(404, "There is no comment to like because the comment is deleted"));
      }

      const userIndex = comment.like.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.numberOfLikes += 1;
        comment.like.push(req.user.id);
         
      } else {
      
          comment.numberOfLikes -= 1;
          comment.like.splice(userIndex, 1);
      }

      await comment.save(); // Save changes to the comment
      res.status(200).json(comment);
  } catch (error) {
      next(error);
  }
};



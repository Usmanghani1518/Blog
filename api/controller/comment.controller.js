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
  try {
    const comment = await Comment.find({postId:req.params.postId}).populate({path:"owner",select:"-password"})
    return res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}

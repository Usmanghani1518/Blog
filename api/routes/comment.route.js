import { Router } from "express";
import { verifyuser} from "../utils/verifyuser.js"
import { createComment,  getComment,likeComment,editComment,deleteComment,getAllPostComments } from "../controller/comment.controller.js";
 const router = Router();

 router.post("/create-comment",verifyuser,createComment)
 router.get("/get-comment/:userId/:postId",verifyuser,getComment)
 router.put("/like-comment/:commentId",verifyuser,likeComment)
 router.put("/edit-comment/:commentId",verifyuser,editComment)
 router.delete("/delete-comment/:commentId",verifyuser,deleteComment)
 router.get("/get-all-post-comment",verifyuser,getAllPostComments)
 

export default router



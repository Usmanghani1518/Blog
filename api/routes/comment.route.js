import { Router } from "express";
import { verifyuser} from "../utils/verifyuser.js"
import { createComment,  getComment,likeComment } from "../controller/comment.controller.js";
 const router = Router();

 router.post("/create-comment",verifyuser,createComment)
 router.get("/get-comment/:userId/:postId",verifyuser,getComment)
 router.put("/like-comment/:commentId",verifyuser,likeComment)

export default router



import { Router } from "express";
import { verifyuser} from "../utils/verifyuser.js"
import { createComment, getComment } from "../controller/comment.controller.js";
 const router = Router();

 router.post("/create-comment",verifyuser,createComment)
 router.get("/get-comment/:userId/:postId",verifyuser,getComment)

export default router



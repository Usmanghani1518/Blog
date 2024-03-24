import express from "express"
const router = express.Router();
import {verifyuser} from "../utils/verifyuser.js"
import {CreatePost,getPost,deletePost ,updatePost} from "../controller/createpost.controller.js"

router.post("/create", verifyuser,CreatePost);
router.get("/getpost",getPost);
router.delete("/delete-post/:postId/:userId",verifyuser,deletePost)
router.put("/update-post/:userId/:postId",verifyuser,updatePost);

export default router
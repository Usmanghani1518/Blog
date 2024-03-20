import express from "express"
const router = express.Router();
import {verifyuser} from "../utils/verifyuser.js"
import {CreatePost,getPost} from "../controller/createpost.controller.js"

router.post("/create", verifyuser,CreatePost);
router.get("/getpost",getPost)

export default router
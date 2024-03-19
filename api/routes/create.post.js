import express from "express"
const router = express.Router();
import {verifyuser} from "../utils/verifyuser.js"
import {CreatePost} from "../controller/createpost.controller.js"

router.post("/create", verifyuser,CreatePost)

export default router
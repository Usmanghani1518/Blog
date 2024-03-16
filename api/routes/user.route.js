import express from "express";
import { testApi,updateUser } from "../controller/user.controller.js";
import {verifyuser} from  "../utils/verifyuser.js"
const router = express.Router();

router.get('/data',testApi);
router.put("/update/:userId",verifyuser,updateUser)

export default router;
import express from "express";
import { testApi,updateUser,deleteUser,signOut ,getUser} from "../controller/user.controller.js";
import {verifyuser} from  "../utils/verifyuser.js"
const router = express.Router();

router.get('/data',testApi);
router.put("/update/:userId",verifyuser,updateUser);
router.delete("/delete/:userId",verifyuser,deleteUser);
router.post("/signout",verifyuser,signOut)
router.get("/get-user",verifyuser,getUser)
export default router;
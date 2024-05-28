import express from "express";
import { testApi,updateUser,deleteUser,signOut ,getUser,deleteUserByAdmin,notificationToUser} from "../controller/user.controller.js";
import {verifyuser} from  "../utils/verifyuser.js"
const router = express.Router();

router.get('/data',testApi);
router.put("/update/:userId",verifyuser,updateUser);
router.delete("/delete/:userId",verifyuser,deleteUser);
router.post("/signout",verifyuser,signOut)
router.get("/get-user/:userId",verifyuser,getUser);
router.delete("/delete-user/:adminId/:userId",verifyuser,deleteUserByAdmin);
router.put("/notification/:adminId/:userId",verifyuser,notificationToUser)
export default router;
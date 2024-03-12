import express from "express"
import { signup ,signin,authGoogle} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/auth/google",authGoogle)
export default router
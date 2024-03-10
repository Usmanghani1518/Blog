import express from "express";
import { testApi } from "../controller/user.controller.js";
const router = express.Router();

router.get('/data',testApi)

export default router;
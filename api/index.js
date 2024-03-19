import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import createPost from "./routes/create.post.js"
import Database from "./Database.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()
app.use(cookieParser())
Database();

app.listen(3000, () => {
    console.log("server is listening on the port 3000");
});




app.use(express.json())
app.use("/api",userRoute)
app.use("/api",authRoute)
app.use("/api/post",createPost)
app.use((err,req,res,next)=>{
    const stausCode = err.stausCode || 500
    const  message = err.message || "There is an error "
    res.status(stausCode).json({
        success:false,
        stausCode,
        message
    })
})
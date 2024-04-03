import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import createPost from "./routes/create.post.js"
import commentPost from "./routes/comment.route.js"
import Database from "./Database.js";
import cookieParser from "cookie-parser";
// import path from "path"

const app = express();
dotenv.config()
app.use(cookieParser())
Database();

app.listen(3000, () => {
    console.log("server is listening on the port 3000");
});


// const __dirname =path.resolve()

app.use(express.json())
app.use("/api",userRoute)
app.use("/api",authRoute)
app.use("/api/post",createPost)
app.use("/api/comment",commentPost)
// app.use(express.static(path.join(__dirname,'/client/dist')))
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'client','dist','index.html'))
// })
app.use((err,req,res,next)=>{
    const stausCode = err.stausCode || 500
    const  message = err.message || "There is an error "
    res.status(stausCode).json({
        success:false,
        stausCode,
        message
    })
})
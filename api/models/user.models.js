import mongoose,{Schema} from "mongoose";

const usereSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1710201600&semt=ais"
    }

},{timestamps:true})

 const User = mongoose.model("User",usereSchema)
export default User
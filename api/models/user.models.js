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
    }

},{timestamps:true})

 const User = mongoose.model("User",usereSchema)
export default User
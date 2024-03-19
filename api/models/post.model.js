import mongoose,{Schema} from "mongoose";
const postSchema = new Schema ({
userId:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
},
tittle:{
    type:String,
    required:true,
    unique:true
},
postImg:{
    type:String,
    default:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"

},
category:{
    type:String,
    default:"uncategorized",
    unique:false
    
},
slug:{
    type:String,
    unique:true,
    required:true
}
},{timestamps:true});

export const Post = new mongoose.model("Post",postSchema)
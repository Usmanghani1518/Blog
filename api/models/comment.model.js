import  mongoose,{ Schema } from "mongoose";

const commentSchema = new Schema ({
    content:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    like:{
        type:Array,
        default:[]
    }
},{timestamps:true});

const Comment = mongoose.model("Comment",commentSchema);

export default Comment;
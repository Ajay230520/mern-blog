import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
            unique:true,
        },
        image:{
            type:String,
            default:'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg'
        },
        category:{
            type:String,
            default:'uncategorized',
        },
        slug:{
            type:String,
            required:true,
            unique:true,
        }

    },{timestamps:true}
);

const Post = mongoose.model('Post',postSchema);
export default Post;
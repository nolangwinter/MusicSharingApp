const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    songName: {
        type:String
    },
    artistName: {
        type:String
    },
    albumArt: {
        type:String
    },
    likes: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    dislikes: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    createdAt: {
        type:Date,
        default:Date.now
    }
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
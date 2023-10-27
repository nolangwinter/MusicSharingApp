const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:true,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required:true,
    },
    profilePic: {
        type:String
    },
    joinedDate: {
        type:Date,
        default:Date.now
    },
    sentFollowRequest: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    receiveFollowRequest: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    followers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    verified: {
        type:Boolean,
        default:false
    },
    verificationToken:String
})

const User = mongoose.model("User", userSchema);

module.exports = User;
const MongoStore = require('connect-mongo');
const mongoose=require('mongoose');
const path=require('path');

// console.log(AVATAR_PATH);
const subSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    result:[{
        type:mongoose.Schema.Types.Mixed
    }]
},{timestamp:true})

const Submission=mongoose.model('Submission',subSchema);
module.exports=Submission;
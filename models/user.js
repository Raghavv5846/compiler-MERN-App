const mongoose=require('mongoose');
const path=require('path');

// console.log(AVATAR_PATH);
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
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
},{timestamp:true})

const User=mongoose.model('User',userSchema);
module.exports=User;
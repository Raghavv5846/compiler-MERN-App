const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Sub=require('../models/submission');



router.get('/getSubmissions',passport.checkAuthentication,async (req,res)=>{
    let submission=await Sub.find({user:req.user._id});
    res.send({status:"success",submiss:submission});

})
router.post('/submissions',(req,res)=>{
    console.log(req.body);
    Sub.create({user:req.user._id,result:req.body.result}).then((user)=>{
        console.log(user);
    }).catch((err)=>{
        if(err) throw err;
    })
    return res.send({mssg:req.user});
})
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),(req,res)=>{
    console.log("users has succesfully logged in");
    return res.redirect('https://compiler-mern-app.vercel.app/');
});
module.exports=router;
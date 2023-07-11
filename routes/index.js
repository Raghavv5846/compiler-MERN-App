const express=require('express');
const passport = require('passport');
const router=express.Router();
router.post('/sub',passport.checkAuthentication,(req,res)=>{
    console.log(req.body);
    return res.send({mssg:"successs"});
})

router.get('/protected',passport.checkAuthentication,(req,res)=>{
    console.log("res recieved");
    res.send({status:"success",user:req.user.name});
});
router.use('/users',require('./users'));
module.exports=router;
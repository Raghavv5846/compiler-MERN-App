const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: `${process.env.CLIENT_ID}`, 
        clientSecret: `${process.env.CLIENT_SECRET}`, // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: `${process.env.CALLBACK}`,
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).then((user)=>{
        
            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                console.log("welcome",profile);
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
    
                }).then((user)=>{
                    return done(null, user);

                }).catch((err)=>{
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                })
            }
        }).catch((err)=>{
            if (err){console.log('error in google strategy-passport', err); return;}

        })
    }


));
passport.serializeUser(function(user,done){
    console.log(user);
    done(null,user.id);
});
// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    console.log("teri id h gndu",id);
    User.findById(id).then((user)=>{
        return done(null,user);
    }).catch((err)=>{
        if(err){console.log("error in finding user-->passport");}
        return done(err);
    })

});
passport.checkAuthentication=function(req,res,next){
    // if th euser is signed in then pass the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
        console.log("session",req.sessionID);
    return res.send({url:'/login',status:"failed"});
}
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;
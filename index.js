const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const googleStrategy=require('./config/google-oauth-strategy');
const db=require('./config/mongoose');
const passport = require('./config/google-oauth-strategy');
const cors=require('cors');

const session=require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv");

dotenv.config();
// const dotenv = require("dotenv");
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['https://compiler-mern-app.vercel.app']; // Replace with the desired URL
        const isAllowed = allowedOrigins.includes(origin) || !origin;
        
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
}));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://compiler-mern-app.vercel.app');
    res.header(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
  });
app.use(express.json());
app.use(session({
    name:'compile',
    secret:`${process.env.SECRET}`,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*30*10*10),
        httpOnly:true,
        secure:true,

    },
    store: MongoStore.create(
        {
            mongoUrl: `${process.env.MONGO_URL}`,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));
app.listen(8000,(err)=>{
    if(err){
        console.log(err,"error while listening on port 8000");
    }
    console.log("port 8000 has started");
});

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const { json } = require('body-parser')
//jwt
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config()

const MONGODBURI = process.env.MONGODBURI
// set up connection with the DB
mongoose.connect(MONGODBURI,{
	useNewUrlParser:true,
	useUnifiedTopology: true,
    useFindAndModify: false
});

// set up listeners to monitor your database connection
const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (err)=> console.log(err.message));
db.on('disconnected', ()=> console.log('mongoose disconnected'));


app.use(express.json());

// cors middleware
const whitelist = ['http://localhost:3000', 'https://p3sandboxfrontend.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1)  {
            callback(null, true)
        } 
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
     credentials: true,
     methods: "GET, PUT, PATCH, POST, DELETE",
}
app.use(cors(corsOptions))
app.use(cookieParser(process.env.SECRET));
//jwt
// app.use(jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use(
    session({
        cookie:{
            secure: true,
            maxAge:60000
               },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true
    })
)





const isAuthenticated = (req, res, next) => {
    // if (req.session.currentUser) 
    if (req.session.currentUser){
        console.log("server sees currentUser")
        
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}



app.use('/users', require('./controllers/users'))
app.use('/gifs', require('./controllers/gifs', isAuthenticated))
app.use('/sessions', require('./controllers/sessions'))







app.listen(PORT, () => {
    console.log('gif is listeing on port', PORT)
})
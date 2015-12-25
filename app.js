'use strict';
const express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mong = require('mongoose'),
    ConnectMongo = require('connect-mongo')(session),
    config = require('./config/config'),
    passport =require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

//MONGOOSE CONFIG
const mongoose = mong.connect(config.dbURL);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


const env = process.env.NODE_ENV || "developpement";
if (env === 'developpement'){
    // Dev settings
    app.use(session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true
    }));
}
else {
    // Prod settings
    app.use(session({
        secret: config.sessionSecret,
        store: new ConnectMongo({
            mongooseConnection:mongoose.connection,
            stringify: true
        }),
        resave: true,
        saveUninitialized: true
    }));
}

/*const userSchema = {
    username:String,
    password:String,
    fullname:String
};

const Person = mongoose.model('users', userSchema);

let John = new Person({
    username: "johndoe",
    password: "hello",
    fullname: "John Doe"

});

John.save((err) => {
    if(!err){
        console.log('done')
    } else {
        console.log(err);
    }
});*/

app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes')(express, app, passport);
require('./auth/passportAuth')(passport, FacebookStrategy, config, mongoose);
app.listen(3000, ()=> {
    console.log('localhost:3000');
    console.log(`MODE : ${env}`);
});
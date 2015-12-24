'use strict';
const express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mong = require('mongoose'),
    ConnectMongo = require('connect-mongo')(session),
    config = require('./config/config');

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
} else {
    // Prod settings
    app.use(session({
        secret: config.sessionSecret,
        store: new ConnectMongo({
            url: config.dbURL,
            stringify: true
        }),
        resave: true,
        saveUninitialized: true
    }));
}

require('./routes/routes')(express, app);


app.listen(3000, ()=> {
    console.log('localhost:3000');
    console.log(`MODE : ${env}`);
});
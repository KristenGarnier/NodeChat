'use strict';
// mongodb://admin:admin@ds027769.mongolab.com:27769/chatcat
const express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'dogareamazingcreatures',
    resave: true,
    saveUninitialized: true
}));

require('./routes/routes')(express, app);


app.listen(3000, ()=> {
    console.log('localhost:3000')
});
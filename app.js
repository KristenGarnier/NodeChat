'use strict';

const express = require('express'),
    app = express(),
    path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes')(express, app);


app.listen(3000, ()=>{
    console.log('localhost:3000')
});
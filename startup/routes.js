
const error = require('../middleware/error');
const express = require('express');
//Routes
const event_route = require('../routes/event');
const user_route = require('../routes/user');
const auth_route = require('../routes/auth');


module.exports = function(app){
    //Use
    app.use(express.json());
    app.use('/events', event_route);
    app.use('/user',user_route);
    app.use('/auth',auth_route);
    app.use(error);
}
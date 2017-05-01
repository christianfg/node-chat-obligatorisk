var path = require("path");
var http = require('http');
var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');


module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    require('../app/routes/routes.js')(app);

    app.use(express.static('../app/views'));

    return app;
};
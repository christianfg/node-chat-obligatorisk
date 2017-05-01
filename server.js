process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var configureMongoose = require('./config/mongoose');
var configureExpress = require('./config/express');


var db = configureMongoose();
var app = configureExpress();


app.listen(3001);
module.exports = app;


console.log('Server running...');
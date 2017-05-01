var Mongoose = require('mongoose');


var roomSchema = Mongoose.Schema({
    title: String,
});

var userSchema = Mongoose.Schema({
    name: String,
    messages: String,
    rooms: String,
    time: { type: Date, default: Date.now() }
});

var messageSchema = Mongoose.Schema({
    content: String,
    rooms: String,
    username: String,
    time: { type: Date, default: Date.now() }
});


module.exports.roomSchema = Mongoose.model('room',roomSchema);
module.exports.userSchema = Mongoose.model('user',userSchema);
module.exports.messageSchema = Mongoose.model('message',messageSchema);

module.exports = (function (app) {
    var User = require('mongoose').model('user');
    var Room = require('mongoose').model('room');
    var Message = require('mongoose').model('message');
    var Schema = require('../database/schema');


    var userNames = [];
    app.locals.userNames = userNames;

    app.get('/', function(req, res) {
        res.render("index");
    });

    app.get("/create", function(req, res){
        res.render("create");
    });

    app.get("/delete", function(req, res){
        Schema.roomSchema.find({rooms:req.params["rooms"]}, function (err, roomName) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.render("delete", {
                allRooms: roomName
            });
        });
    });


    app.get("/:rooms", function(req, res) {
        Schema.messageSchema.find({rooms:req.params["rooms"]}, function (err, content, username) {
            Schema.roomSchema.find({}, function (err, title) {
                res.render("rooms", {
                    allMessages: content,
                    allUsers: username,
                    allRooms: title,
                    head: req.params.rooms
                });
            });
        });
    });


    app.post("/", function(req, res) {
        createUser = 0;
        if (!req.body.userName) {
            res.status(400).send("Type in an username");
            return;
        }
        else {
            for(i = 0; i < userNames.length; i++) {
                if (userNames[i]["userName"] == req.body.userName) {
                    createUser = 1;
                    break;
                }
            }
        }
        if (createUser == 0) {
            req.session.users = req.body.userName;
            userNames.push({userName: req.body.userName,});
            var user = new User({name: req.session.users});

            user.save();
            res.redirect("/rooms");
        }
        else {
            res.status(400).send("Username is in use. Pick another").redirect("/");
        }
    });


    app.post("/create", function(req, res) {
        if (!req.body.title) {
            res.status(400).send("Give the room a name");
            return;
        }
        var newRoom = new Room({title: req.body.title, head: req.body.title});

        newRoom.save();
        res.redirect("/"+newRoom.title);
    });


    app.post("/delete", function(req, res) {
        Schema.roomSchema.remove({_title: req.params.title}, function (err) {
            if (!err) {
                console.log("deleted");
            }
            else {
                console.log("error");
            }
        });
        res.redirect("/rooms");
    });


    app.post("/:rooms", function(req, res) {
        if (!req.body.message) {
            res.status(400).send("You have to write something in the field above");
            return;
        }
        var newMessage = new Message({username: req.session.users, content: req.body.message, rooms: req.params["rooms"]});
        newMessage.save();

        res.redirect(req.params["rooms"]);
    });
});
//global parameters
var express = require("express");
var app = express();
//server = require("http").createServer(app);

//setting up environment for app
app.set('port', process.env.PORT || 3000);
app.set('view options', {layout: false});
//app.use(express.logger());
app.use(express.static(__dirname + '/views'));

var socket = require("socket.io");
var server = app.listen(app.get('port'));
var io = socket.listen(server);	

//app needs to get a route
app.get('/', function(req, res) {
	res.render('/views/index.html');
});

//starts server
console.log("Server is starting at port " + app.get('port'));



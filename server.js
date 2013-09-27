//global parameters
var express = require("express");
var app = express();

//setting up environment for app
app.set('port', process.env.PORT || 3000);
app.set('view options', {layout: false});
app.use(express.static(__dirname + '/views'));

var socket = require("socket.io");
var server = app.listen(app.get('port'));
var io = socket.listen(server);	
var players = [];

//app needs to get a route
app.get('/', function(req, res) {
	res.render('/views/index.html');
});

//starts server
console.log("Server is starting at port " + app.get('port'));


io.sockets.on('connection', function(socket) {

	// when the client tries to connect, this executes
	socket.on('connect', function() {
		
		if(players.length==0) {
			socket.playerColor = "BLACK";
			socket.emit("sendColorToClient", socket.playerColor);

			players.push(socket.playerColor);
		}
		else if (players.length==1) {
			socket.playerColor = "WHITE";
			socket.emit("sendColorToClient", socket.playerColor);

			players.push(socket.playerColor);
		}

		// when the player disconnects
		socket.on('disconnect', function() {

			players.length = 0;		//clear player array
			socket.broadcast.emit('disconnect');
		});
	});

	// when the client emits sendMoveToServer, this listens and executes
	socket.on('sendMoveToServer', function(moveMsg) {
		io.sockets.emit("broadcastMove", moveMsg);
	});
});
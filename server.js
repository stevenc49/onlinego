//global parameters

var express = require("express"),
	app = express(),
	server = require("http").createServer(app);

//setting up environment for app
app.set('port', process.env.PORT || 3000);


function start() {

	//app needs to get a route
	app.get('/', function(req, res) {
		res.send("hello pandaWeekend!");	
	});

	//starts server
	server.listen(app.get('port'), function() { console.log("Server is starting at port " + app.get('port')); });

}

exports.start = start;

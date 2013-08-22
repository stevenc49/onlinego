//global parameters
var express = require("express"),
	app = express(),
	server = require("http").createServer(app);

//setting up environment for app
app.set('port', process.env.PORT || 3000);
app.set('view options', {layout: false});
app.use(express.logger());
app.use(express.static(__dirname + '/views'));


function start() {

	//app needs to get a route
	app.get('/', function(req, res) {
		res.render('/views/index.html');
	});

	//starts server
	server.listen(app.get('port'));
	console.log("Server is starting at port " + app.get('port'));

}

exports.start = start;

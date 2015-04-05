var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var player = require("./player.js");

var socket;

app.listen(8000);

function handler (req, res) {
	console.log('Request!!');
  fs.readFile(__dirname + '/index.html',
  	function (err, data) {
    	if (err) {
      	res.writeHead(500);
      	return res.end('Error loading index.html');
    	}
    	res.writeHead(200);
    	res.end(data);
  });
}

var socket;

io.on('connection', connectionHandler);

function connectionHandler(sock) {
	socket = sock;
  socket.on('play', function(path) {
		player.start(path, logResponse);
	});
	socket.on('stop', function(){
		player.stop(logResponse);
		socket.emit('news',{message: 'stopped'});
	});
}

function logResponse(text) {
	console.log(text);
	socket.emit('news', {message: text});
}

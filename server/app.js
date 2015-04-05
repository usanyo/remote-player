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

io.on('connection', function (soc) {
	socket = soc;
  socket.on('play', function(path) {
		player.start(path, sendBackLog, playEnded);
	});
	socket.on('stop', function(){
		console.log('stop');
		player.stop(function(err, stdout, stderr) {
			console.log('Stopped');
		});
	});
});

function sendBackLog(text) {
	console.log(text);
	socket.emit('log', {message: text});
}

function playEnded(err, stdout, stderr) {
	sendBackLog('Elvileg torolve' + '\n' + stdout + '\n' + stderr);
}



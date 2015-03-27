var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var player = require("./player.js");

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

io.on('connection', function (socket) {
  socket.on('play', function(path) {
		player.start(path, function(text) {
			console.log(text);
  		socket.emit('news', { message: text });
		});
	});
	socket.on('stop', function(){
		console.log('stop');
		player.stop(function(text) {
			console.log(text);
			socket.emit('news', { message: text });
		});
		socket.emit('news',{message: 'stopped'});
	});
});

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var player = require("./player.js");
var queue = require("./queue.js");
var core = require("./core.js");

core.init(player, queue);
player.init(logResponse, setStatus);

app.listen(8000);

function handler (req, res) {
	console.log('Request!!');
	var path = req.url == '/' ? '/index.html' : req.url;
	console.log(path)
	fs.readFile(__dirname + path,
  	function (err, data) {
    	if (err) {
      	res.writeHead(500);
      	return res.end('Error loading ' + path);
    	}
    	res.writeHead(200);
    	res.end(data);
  });
}

var socket;

io.on('connection', connectionHandler);

function connectionHandler(sock) {
	socket = sock;
	socket.on('command', function(command){
		switch(command) {
			case 'pause':
				if(core.player.isPlaying()) {
					core.pause();
				}
				else
					core.play(core.queue.getCurrent().path);
				break;
			case 'exit':
				if(core.player.isPlaying())
				core.stop();
				break;
			case 'seek_plus_600':
				core.playNext();
				socket.emit('lista',core.queue.list);
				socket.emit('current',core.queue.getCurrent());

				break;
		}
	});
	socket.on('list', function(){
		socket.emit('lista',core.queue.list);
		socket.emit('current',core.queue.getCurrent());
	});
	socket.on('goto', function(index){
		core.playThis(index);
		socket.emit('lista',core.queue.list);
		socket.emit('current',core.queue.getCurrent());
	});
	socket.on('getStatus', function() {
		setStatus(core.player.getStatus());
	});
}

function logResponse(text) {
	console.log(text);
	socket.emit('news', {message: text});
}

function setStatus(value) {
	socket.emit('setStatus', value);
}
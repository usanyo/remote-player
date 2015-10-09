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
		}
	});
	socket.on('list', function(){
		socket.emit('lista',core.queue.list);
		socket.emit('current',core.queue.getCurrent());
	});
	socket.on('goto', function(index){
		core.playThis(index);
		console.log(JSON.stringify(core.queue.list));
		socket.emit('lista',core.queue.list);
		socket.emit('current',core.queue.getCurrent());
	});
}

function logResponse(text) {
	console.log(text);
	socket.emit('news', {message: text});
}

function setStatus(value) {
	socket.emit('setStatus', value);
}
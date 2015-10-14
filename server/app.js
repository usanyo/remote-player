var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var path = require("path");
var player = require("./player.js");
var queue = require("./queue.js");
var core = require("./core.js");

var socket;

core.init(player, queue, {
	update : getUpdate,
	log	: logResponse,
	status: setStatus
});
app.listen(8000);
io.on('connection', connectionHandler);

function handler (req, res) {
	console.log('Request for ' + req.url);
	var url = req.url == '/' ? '/client/index.html' : req.url;
	var fullPath = path.join(__dirname,'../', url);
	console.log(fullPath);
	fs.readFile(fullPath,
  	function (err, data) {
    	if (err) {
			res.writeHead(500);
			return res.end('Error loading ' + fullPath);
    	}
    	res.writeHead(200);
    	res.end(data);
  });
}

function connectionHandler(sock) {
	socket = sock;
	socket.on('execute', execute);
	socket.on('getUpdate', getUpdate);
	socket.on('goto', goto);
	socket.on('getStatus', getStatus);
}

function execute(command){
	switch(command) {
		case 'seek_minus_600':
			break;
		case 'seek_minu_30':
			break;
		case 'pause':
			if(core.getStatus() == "STOPPED")
				core.play();
			else
				core.pause();
			break;
		case 'exit':
			core.stop();
			break;
		case 'seek_plus_30':
			break;
		case 'seek_plus_600':
			core.playNext();
			break;
		case 'decrease_volume':
			break;
		case 'increase_volume':
			break;
	}
}

function getUpdate(){
	socket.emit('update', {
		list: core.queue.list,
		current: core.queue.getCurrent(),
		status: core.getStatus() == 'PAUSED'
	});
}

function goto(index) {
	core.playThis(index);
}

function getStatus() {
	setStatus(core.getStatus() == 'PAUSED');
}

function logResponse(text) {
	console.log(text);
	socket.emit('news', {message: text});
}

function setStatus(value) {
	socket.emit('setStatus', value);
}
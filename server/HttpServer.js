var net = require("net");
var http = require("http");
var url = require("url");

var player = require('./player.js');

var server = http.createServer(requestCameIn);
server.listen(8000);


function requestCameIn(request, response) {
	var query = url.parse(request.url, true).query;
	switch(query.command) {
		case 'start':
			if(query.path) {
				player.start(query.path);
				response.write('Start playing!\n');
			}
			else
				response.write('No media file given!');
			break;
		case 'stop':
			player.stop();
			response.write('Stop playing!\n');
			break;
		case 'pause':
			player.pause();
			response.write('Pause/resume playing!');
			break;
		default:
			response.write('Invalid command!\n');
	}
	request.pipe(response);
}
/*
var server = net.createServer(function(socket) {
	console.log('connected');
	socket.on('data', function(data) {
		var request = data.toString();
	});
	socket.write("Szia");
	socket.end();
});
*/

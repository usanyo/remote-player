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
		case 'seekforward30mp':
			player.seekP30();
			response.write('Forward 30mp');
			break;
		case 'seekback30mp':
			player.seekM30();
			response.write('Backward 30mp');
			break;
		case 'seekforward10p':
			player.seekP600();
			response.write('Forward 10p');
			break;
		case 'seekback10p':
			player.seekM600();
			response.write('Backward 10p');
			break;
		case 'volUp':
			player.volumeUp();
			response.write('Volume++');
			break;
		case 'volDown':
			player.volumeDown();
			response.write('Volume--');
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

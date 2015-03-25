var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var palyer = require("./palyer.js");

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
  socket.emit('news', { hello: 'world' });
  socket.on('play', player.start);
  });
});

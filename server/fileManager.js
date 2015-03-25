var fs = require("fs");

var path = "/home/sanyo"

function isDir (argument) {
}

fs.readdir(path, function(err, files) {
	for (var i = 0; i < files.length; i++) {
		console.log(files[i]);
	}
});


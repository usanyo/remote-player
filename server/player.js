var fs = require('fs');

var output = "";

function ls(path) {
	fs.readdir(path, printList);
	return "Http";
}

function printList(err, files) {
	output = "";
	for(var i = 0; i < files.length; i++) {
		if(!files[i].startsWith('.'))
			output += files[i] + '\n';
	}
}


if (typeof String.prototype.startsWith != 'function') {
	  // see below for better implementation!
		  String.prototype.startsWith = function (str){
				    return this.indexOf(str) == 0;
						  };
}

exports.ls = ls;

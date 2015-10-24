var fs = require("fs");
var path = require("path");

var updateList = function() {}
var selectMedia = function() {}

var currentPath = "/media/Teri";

module.exports.init = function(updateFun, selectFun) {
	updateList = updateFun;
	selectMedia = selectFun;
}

module.exports.open = function (item) {
	if(item) {
		currentPath = path.join(currentPath, item);
		if(fs.lstatSync(currentPath).isDirectory()) {
			console.log('Path: ' + currentPath);
			getNewList();
		}
		else if( path.extname(currentPath) == ".mp3"
					|| path.extname(currentPath) == ".mp4"
					|| path.extname(currentPath) == ".mkv"
					|| path.extname(currentPath) == ".avi"
					|| path.extname(currentPath) == ".wma"
					|| path.extname(currentPath) == ".wav"
					) {
			addMedia();
			currentPath = path.join(currentPath, "..");
		}
	}
	else {
		getNewList();
	}
}

function getNewList() {
	fs.readdir(currentPath, updateList);
}

function addMedia() {
	media = {
		name: path.basename(currentPath),
		path: currentPath,
		status: "TO_PLAY"
	};
	selectMedia(media);
}


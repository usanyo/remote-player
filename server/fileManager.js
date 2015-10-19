var fs = require("fs");
var path = require("path");

var updateList = function() {}
var selectMedia = function() {}

var currentPath = "/home/sanyo";

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
	}
	else {
		getNewList();
	}
}

function getNewList() {
	fs.readdir(currentPath, updateList);
}


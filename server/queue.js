var fs = require('fs');

var PATH_TO_JSON = "queue.json"
var list;

module.exports.init = function () {
	loadJson()
}

module.exports.clean = function () {
	if(fs.existsSync(PATH_TO_JSON))
		fs.unlinkSync(PATH_TO_JSON)
}

module.exports.add = function (media) {
	loadJson()
	list.push(media);
	saveJson()
}

module.exports.length = function() {
	loadJson()
	return list.length;
}

module.exports.removeItem = function (item) {
	loadJson()
	var index = module.exports.indexOf(item)
	list.splice(index, 1)
	saveJson()
}

module.exports.indexOf = function (item) {
	for(var i = 0; i < list.length; i++)
		if(JSON.stringify(item) === JSON.stringify(module.exports.list[i]))
			return i;
	return -1;
}

module.exports.next = function () {
	var isPlaying = false;
	for(var i = 0; i < list.length; i++) {
		if(list[i].status == "PLAYING") {
			list[i].status = "PLAYED";
			if(i+1 < list.length)
				list[i+1].status = "PLAYING";
			isPlaying = true;
			break;
		}
	}
	if(!isPlaying)
		list[0].status = "PLAYING"
	saveJson()
}

module.exports.goto = function (index) {
	for(var i = 0; i < index; i++)
		list[i].status = "PLAYED";
	list[index].status = "PLAYING"
	for(var i = index + 1; i < list.length; i++)
		list[i].status = "TO_PLAY"
	saveJson()
}

module.exports.getCurrent = function() {
	loadJson()
	var current = null;
	list.forEach(function(song) {
		if(  song.status == "PLAYING"
			|| song.status == "PAUSED") {
			console.log(song.status)
			current = song;
		}
	}, this);
	return current;
}

function loadJson() {
	if(fs.existsSync(PATH_TO_JSON))
		module.exports.list = JSON.parse(fs.readFileSync(PATH_TO_JSON, 'utf8'));
	else
		module.exports.list = [];
	list = module.exports.list;
}

function saveJson() {
	fs.writeFileSync(PATH_TO_JSON, JSON.stringify(module.exports.list, null, 4)); 
}

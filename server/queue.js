var fs = require('fs');

var PATH_TO_JSON = "queue.json"

module.exports.clean = function () {
	if(fs.existsSync(PATH_TO_JSON))
		fs.unlinkSync(PATH_TO_JSON)
}

module.exports.add = function (media) {
	loadJson()
	module.exports.list.push(media);
	saveJson()
}

module.exports.length = function() {
	loadJson()
	return module.exports.list.length;
}

module.exports.removeItem = function (item) {
	loadJson()
	var index = module.exports.indexOf(item)
	module.exports.list.splice(index, 1)
	saveJson()
}

module.exports.indexOf = function (item) {
	for(var i = 0; i < module.exports.list.length; i++)
		if(JSON.stringify(item) === JSON.stringify(module.exports.list[i]))
			return i;
	return -1;
}

module.exports.next = function () {
	var list = module.exports.list;
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
	var list = module.exports.list;
	for(var i = 0; i < index; i++)
		list[i].status = "PLAYED";
	list[index].status = "PLAYING"
	for(var i = index + 1; i < list.length; i++)
		list[i].status = "TO_PLAY"
}

function loadJson() {
	if(fs.existsSync(PATH_TO_JSON))
		module.exports.list = JSON.parse(fs.readFileSync(PATH_TO_JSON, 'utf8'));
	else
		module.exports.list = [];
}

function saveJson() {
	fs.writeFileSync(PATH_TO_JSON, JSON.stringify(module.exports.list, null, 4)); 
}
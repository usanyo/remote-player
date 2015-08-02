var fs = require('fs');

var PATH_TO_JSON = "queue.json"

module.exports.add = function (media) {
	loadJson()
	module.exports.items.push(media);
	saveJson()
}

module.exports.length = function() {
	loadJson()
	return module.exports.items.length;
}

module.exports.pop = function () {
	return module.exports.items.shift()
}

function loadJson() {
	if(fs.existsSync(PATH_TO_JSON))
		module.exports.items = JSON.parse(fs.readFileSync(PATH_TO_JSON, 'utf8'));
	else
		module.exports.items = [];
}

function saveJson() {
	fs.writeFileSync(PATH_TO_JSON, JSON.stringify(module.exports.items, null, 4)); 
}
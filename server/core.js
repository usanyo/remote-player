
var player;
var queue;

module.exports.init = function(plr, que, logFunction) {
	module.exports.player = plr;
	player = plr;
	module.exports.queue = que;
	queue = que;
	player.init(logFunction);
	queue.init();
}

module.exports.clean = function() {
	queue.clean();
}

module.exports.add = function(media) {
	queue.add(media);
}

module.exports.play = function(media) {
	player.start(media);
}

module.exports.stop = function() {
	player.stop();
}

module.exports.playNext = function() {
	player.stop();
	queue.next();
	var actualSong = queue.getCurrent();
	player.start(actualSong.path)
}
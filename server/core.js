
module.exports.init = function(player, queue, logFunction) {
	module.exports.player = player;
	module.exports.queue = queue;
	player.init(logFunction);
	queue.init();
}

module.exports.clean = function() {
	module.exports.queue.clean();
}

module.exports.add = function(media) {
	module.exports.queue.add(media);
}

module.exports.play = function(media) {
	module.exports.player.start(media);
}

module.exports.stop = function() {
	module.exports.player.stop();
}

module.exports.playNext = function() {
	module.exports.queue.pop();
}
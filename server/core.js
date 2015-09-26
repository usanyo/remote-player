

module.exports.init = function(player, queue) {
	module.exports.player = player;
	module.exports.queue = queue;
}

module.exports.clean = function() {
	module.exports.queue.clean();
}

module.exports.playNext = function() {
	module.exports.queue.pop();
}
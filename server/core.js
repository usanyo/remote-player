
var player;
var queue;
var updateDisplay = function(){};

module.exports.init = function(plr, que, callbacks) {
	module.exports.player = plr;
	module.exports.queue = que;
	player = plr;
	queue = que;
	updateDisplay = callbacks.update;
	player.init(callbacks.log, callbacks.status);
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

module.exports.pause = function() {
	player.pause();
}

module.exports.playNext = function() {
	player.stop();
	queue.next();
	setTimeout(function(){
		if(!player.isPlaying()) {
			var actualSong = queue.getCurrent();
			player.start(actualSong.path);
		}
	},1000);
	updateDisplay();
}

module.exports.playThis = function(index) {
	if(queue.indexOf(queue.getCurrent()) != index || !player.isPlaying()) {
		if (player.isPlaying())
			player.stop();
		setTimeout(function(){
			if(!player.isPlaying())
				player.start(queue.getCurrent().path);
		},1000);
		queue.goto(index);
	}
	updateDisplay();
}

module.exports.getStatus = function() {
	if(player.isPlaying())
		if(player.isPaused())
			return 'PAUSED';
		else
			return 'PLAYING';
	else
		return 'STOPPED';
}
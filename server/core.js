
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

module.exports.pause = function() {
	player.pause();
}

module.exports.playNext = function() {
	player.stop();
	queue.next();
	var actualSong = queue.getCurrent();
	player.start(actualSong.path)
}

module.exports.playThis = function(index) {
	//console.log("jatszik: " + player.isPlayer())
	if(queue.indexOf(queue.getCurrent()) != index || !player.isPlaying()) {
		if (player.isPlaying())
			player.stop();
		setTimeout(function(){
			if(!player.isPlaying())
				player.start(queue.getCurrent().path);
		},1000);
		queue.goto(index);
	}
}
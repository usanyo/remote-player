var assert = require("assert");

var player = require("../server/player");

describe('Player', function() {
	describe('#start()', function() {
		it('should started and stopped', function() {
			player.start("../server/test.mp3");
			assert.equal(true, player.isPlaying());
			player.stop();
			assert.equal(false, player.isPlaying());
		});
	});
});

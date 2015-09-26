var assert = require("assert");

var player = require("../server/player");

describe('Player', function() {
	describe('#start()', function() {
		it('should started and stopped', function() {
			assert.equal(false, player.isPlaying());
			player.start("../server/test.mp3", function(message) {
				assert.equal("start playing ../server/test.mp3", message);
			});
			assert.equal(true, player.isPlaying());
			player.stop();
			//assert.equal(false, player.isPlaying());
		});
	});
});

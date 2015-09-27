var assert = require("assert")
var fs = require("fs")
var core = require("../server/core")

var queue = {
	add : function() {},
	length : function() {},
	removeItem : function() {},
	indexOf : function() {},
	next : function() {},
	goto : function() {},
	list : ['first.mp3', 'youtube.avi']
}

var player = {
	'playEnded' : function() {},
	'start' : function() {},
	'stop' : function() {},
	'pause' : function() {},
	'isPlaying' : function() {}
}

describe('Core', function() {
	describe('init', function () {
		it('should assign the player and the queue', function () {
			core.init(player, queue)
			assert.equal(player, core.player)
			assert.equal(queue, core.queue)
		});
	});
	describe('playNext', function () {
		it('should play the first song', function () {
			var popCalled = false;
			queue.list = ['first.mp3', 'youtube.avi']
			queue.pop = function() {
				popCalled = true;
			}
			core.playNext()
			assert(popCalled)
		});
	});

});

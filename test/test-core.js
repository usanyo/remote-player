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
	clean : function() {},
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
		it('should clean the queue', function () {
			core.init(player, queue)
			var isCleaned = false;
			core.queue.clean = function() {
				isCleaned = true;
			}
			core.clean()
			assert(isCleaned)
		});
		it('should assign the player and the queue', function () {
			core.init(player, queue)
			assert.equal(player, core.player)
			assert.equal(queue, core.queue)
		});
	});
	describe('core player', function () {
		it('should add a new song', function () {
			var addCalled = false;
			queue.list = ['first.mp3', 'youtube.avi']
			queue.add = function(song) {
				addCalled = true;
				assert.equal(song,"song");
			}
			core.add("song")
			assert(addCalled)
		});
		it('should delegate play', function () {
			var called = false;
			player.start = function(song) {
				called = true;
				assert.equal(song,"song");
			}
			core.play("song")
			assert(called)
		});
		it('should delegate stop', function () {
			var called = false;
			player.stop = function() {
				called = true;
			}
			core.stop()
			assert(called)
		});
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

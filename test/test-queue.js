var assert = require("assert")
var fs = require("fs")
var queue = require("../server/queue")

describe('Queue', function() {
	before(function () {
		var queueFile = 'queue.json'
		if(fs.existsSync(queueFile))
			fs.unlinkSync(queueFile)
	});
	describe('add media', function () {
		it('should increase the number of items', function () {
			var N_before = queue.length()
			queue.add({name: "Test.mp3", path: "server/test.mp3", status: "TO_PLAY"})

			assert.equal(queue.length(), N_before + 1);
		});
		it('should add Test2', function () {
			var N = queue.length()
			queue.add({name: "Test2", path: "/media/Teri", status: "TO_PLAY"})

			assert.equal(queue.list[N].name, "Test2");
			assert.equal(queue.list[N].path, "/media/Teri");
		});
	});
	describe('remove media', function () {
		it('should find the index of Test2', function () {
			var i = queue.indexOf({name: "Test2", path: "/media/Teri", status: "TO_PLAY"})
			assert.equal(i, 1)
		});
		it('should remove the Test.mp3 file', function () {
			queue.removeItem(queue.list[0])
			assert.equal(1, queue.length())
			assert.equal(JSON.stringify(queue.list[0]),JSON.stringify({name: "Test2", path: "/media/Teri", status: "TO_PLAY"}))
		});
	});
	describe('Next media', function () {
		it('should start to play the first media', function () {
			queue.add({name: "Song0", path: "/media/Teri0", status: "TO_PLAY"})
			queue.add({name: "Song1", path: "/media/Teri1", status: "TO_PLAY"})
			queue.next()
			assert.equal(queue.list[0].status, "PLAYING")
		});
		it('should step to the next media', function () {
			queue.next()
			assert.equal(queue.list[0].status, "PLAYED")
			assert.equal(queue.list[1].status, "PLAYING")
		});
	});
	describe('Go to media', function () {
		it('should start to step to index', function () {
			queue.goto(2)
			assert.equal(queue.list[0].status, "PLAYED")
			assert.equal(queue.list[1].status, "PLAYED")
			assert.equal(queue.list[2].status, "PLAYING")
			assert.equal(queue.list[3].status, "TO_PLAY")
		});
	});
});

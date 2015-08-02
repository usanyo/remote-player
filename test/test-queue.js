var assert = require("assert")
var fs = require("fs")
var queue = require("../server/queue")
describe('Queue', function() {
	before(function () {
		fs.unlinkSync('queue.json')
	});
	describe('add media', function () {
		it('should increase the number of items', function () {
			var N_before = queue.length()
			queue.add({name: "Test.mp3", path: "server/test.mp3"})

			assert.equal(queue.length(), N_before + 1);
		});
		it('should add Test2', function () {
			var N = queue.length()
			queue.add({name: "Test2", path: "/media/Teri"})

			assert.equal(queue.items[N].name, "Test2");
			assert.equal(queue.items[N].path, "/media/Teri");
		});
	});
	describe('pop media', function () {
		it('should pop the first media', function () {
			var first = queue.pop()

			assert.equal(first.name, "Test.mp3");
			assert.equal(first.path, "server/test.mp3");
		});
	});
});

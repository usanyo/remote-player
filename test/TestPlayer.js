var player = require('../server/player.js');

QUnit.test("Test dir list", function(assert){
	assert.equal(ls("/home"),"HttpServer.js\nplayer.js\n","Passed");
});

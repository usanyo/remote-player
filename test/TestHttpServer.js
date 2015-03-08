var httpServer = require('../server/HttpServer.js');

QUnit.test( "hello test", function( assert ) {
  assert.ok( httpServer.szia(), "Passed!" );
});

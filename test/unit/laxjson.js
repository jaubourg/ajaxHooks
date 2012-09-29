module( "laxjson", { teardown: moduleTeardown } );

test("proper json", function() {
	expect( 1 );
	stop();
	jQuery.ajax( "data/proper.json", {
		dataType: "json",
		laxjson: true
	}).done(function( data ) {
		deepEqual( data, {
			"hello": 78,
			"world": "string"
		}, "proper data" );
	}).fail(function() {
		strictEqual( arguments, [] );
	}).always(function() {
		start();
	});
});

test("bad json", function() {
	expect( 2 );
	stop();
	jQuery.ajax( "data/bad.json", {
		dataType: "json",
		laxjson: true
	}).done(function( data ) {
		ok( data.deferred && jQuery.isFunction( data.deferred.promise ), "deferred instantiated" );
		strictEqual( data.string, "test-6", "string properly concatenated" );
	}).fail(function() {
		strictEqual( arguments, [] );
	}).always(function() {
		start();
	});
});

test("broken json", function() {
	expect( 1 );
	stop();
	jQuery.ajax( "data/broken.json", {
		dataType: "json",
		laxjson: true
	}).done(function( data ) {
		strictEqual( arguments, [] );
	}).fail(function( _, errorType ) {
		strictEqual( errorType, "parsererror", "Parser error" );
	}).always(function() {
		start();
	});
});

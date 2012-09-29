module( "promisea", { teardown: moduleTeardown } );

jQuery.each( "resolve reject notify".split( " " ), function( i, method ) {

	test( "return value in " + method + " callback", function() {
		expect( 1 );
		var promise = jQuery.Deferred()[ method ]( "hello" ).promiseA(),
			args = [];
		args[ i ] = function( str ) {
			return str + " world";
		};
		promise.then.apply( promise, args ).then(function( str ) {
			if ( i < 2 ) {
				strictEqual( str, "hello world", "done" );
			} else {
				ok( false, "done" );
			}
		}, function( str ) {
			ok( false, "reject" );
		}, function( str ) {
			if ( i === 2 ) {
				strictEqual( str, "hello world", "progress" );
			} else {
				ok( false, "done" );
			}
		});
	});

	test( "exception in " + method + " callback", function() {
		expect( 1 );
		var promise = jQuery.Deferred()[ method ]( "hello" ).promiseA(),
			args = [];
		args[ i ] = function( str ) {
			throw str + " world";
		};
		promise.then.apply( promise, args ).then(function() {
			ok( false, "done" );
		}, function( str ) {
			strictEqual( str, "hello world", "exception caught" );
		}, function() {
			ok( false, "progress" );
		});
	});
});

test( "get", function() {
	expect( 3 );
	jQuery.Deferred().resolve({
		hello: "world"
	}).promiseA().get( "hello" ).then(function( str ) {
		strictEqual( str, "world", "get existing ok" );
	});
	jQuery.Deferred().resolve({}).promiseA().get( "hello" ).then(function( str ) {
		strictEqual( str, undefined, "get non-existing ok" );
	});
	jQuery.Deferred().resolve().promiseA().get( "hello" ).then( null, function() {
		ok( true, "get on undefined throws exception" );
	});
});

test( "call", function() {
	expect( 5 );
	jQuery.Deferred().resolve({
		max: Math.max
	}).promiseA().call( "max", 1 ).then(function( num ) {
		strictEqual( num, 1, "call existing ok" );
	});
	jQuery.Deferred().resolve({
		max: Math.max
	}).promiseA().call( "max", 10, 100, 3, 450 ).then(function( num ) {
		strictEqual( num, 450, "call existing with multiple args ok" );
	});
	jQuery.Deferred().resolve({
		max: "uh-oh"
	}).promiseA().call( "max", 1 ).then( null, function( num ) {
		ok( true, "call non-method throws exception" );
	});
	jQuery.Deferred().resolve({}).promiseA().call( "max", 1 ).then( null, function( num ) {
		ok( true, "call non-existing method throws exception" );
	});
	jQuery.Deferred().resolve().promiseA().call( "max", 1 ).then( null, function( num ) {
		ok( true, "call on undefined throws exception" );
	});
});

module( "deferred/promisea", { teardown: moduleTeardown } );

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

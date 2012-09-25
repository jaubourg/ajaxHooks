module( "ajax/xdr", { teardown: moduleTeardown } );

if ( window.XDomainRequest ) {

	test( "success", function() {
		stop();
		expect( 1 );
		jQuery.ajax( "http://samples.msdn.microsoft.com/workshop/samples/author/dhtml/Ajax/xdomain.response.movies.aspx" )
			.done(function( data ) {
				ok( /^\s*movieID/.test( data ), "request performed" );
			})
			.fail(function() {
				strictEqual( arguments, [] );
			})
			.always( start );
	});

	test( "chunked", function() {
		stop();
		expect( 1 );
		jQuery.ajax( "data/chunked.php", {
			crossDomain: true,
			cache: false
		})
			.done(function( data ) {
				strictEqual( data, "hello\nworld", "request performed" );
			})
			.fail(function() {
				strictEqual( arguments, [] );
			})
			.always( start );
	});

	test( "error", function() {
		stop();
		expect( 1 );
		jQuery.ajax( "http://www.google.com" )
			.done(function() {
				strictEqual( arguments, [] );
			})
			.fail(function( $1, $2, error ) {
				strictEqual( error, error ? "Not Found" : "", "request performed but failed" );
			})
			.always( start );
	});
	
	test( "timeout", function() {
		expect( 1 );
		stop();
		jQuery.ajax({
			url: "data/delay.php?wait=5",
			crossDomain: true,
			timeout: 100
		}).fail(function(_,status) {
			strictEqual( status, "timeout", "timeout" );
		}).always( start );
	});

}

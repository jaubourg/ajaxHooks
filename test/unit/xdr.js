module( "ajax/xdr", { teardown: moduleTeardown } );

if ( window.XDomainRequest || jQuery.support.cors ) {

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

	test( "abort", function() {
		expect( 2 );
		jQuery.ajax( "http://samples.msdn.microsoft.com/workshop/samples/author/dhtml/Ajax/xdomain.response.movies.aspx&_=" + jQuery.now() )
			.done(function() {
				strictEqual( arguments, [] );
			})
			.fail(function( _, reason, message ) {
				strictEqual( reason, "testabort", "aborted" );
				strictEqual( message, "testabort", "correct abort message" );
			})
			.abort( "testabort" );
	});

}

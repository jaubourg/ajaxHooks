module( "ajax/xdr", { teardown: moduleTeardown } );

if ( window.XDomainRequest ) {

	test( "success", function() {
		stop();

		jQuery.ajax( "http://samples.msdn.microsoft.com/workshop/samples/author/dhtml/Ajax/xdomain.response.movies.aspx" )
			.done(function( data ) {
				ok( /^\s*movieID/.test( data ), "request performed" );
			})
			.always( start );
	});

	test( "error", function() {
		stop();

		jQuery.ajax( "http://www.google.com" )
			.fail(function( $1, $2, error ) {
				strictEqual( error, "Not Found", "request performed but failed" );
			})
			.always( start );
	});

}

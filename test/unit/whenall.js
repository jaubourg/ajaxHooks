module( "whenall", { teardown: moduleTeardown } );

jQuery.each( "when whenever".split( " " ), function( _, method ) {
	function ident( x ) {
		return x;
	}
	function transform( delay ) {
		return jQuery.Deferred(function( defer ) {
			setTimeout(function() {
				counter++;
				if ( isWhen || Math.random() > 0.5 ) {
					defer.resolve( delay );
				} else {
					defer.reject( delay );
				}
			}, delay );
		}).promise();
	}
	var array = [ 10, 100, 30, 50, 110, 40, 80 ],
		counter = 0,
		isWhen = ( method === "when" ),
		getVal = isWhen ? ident : function( arg ) {
			return arg.value;
		};
	method += "All";
	test( method + ": basic", function() {
		expect( 1 + array.length );
		stop();
		jQuery[ method ]( array, transform ).done(function() {
			jQuery.each( arguments, function( index, arg ) {
				strictEqual( getVal( arg ), array[ index ], "proper value #" + index );
			});
		});
		setTimeout(function() {
			strictEqual( counter, array.length, "everything was joined properly" );
			start();
		}, Math.max.apply( Math, array ) );
	});
	test( method + ": non deferred", function() {
		expect( 1 + array.length );
		jQuery[ method ]( array, ident ).always(function() {
			strictEqual( arguments.length, array.length, "everything was joined properly" );
			jQuery.each( arguments, function( index, arg ) {
				strictEqual( getVal( arg ), array[ index ], "proper value #" + index );
			});
		});
	});
});

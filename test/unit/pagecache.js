module( "pagecache", { teardown: moduleTeardown } );

test( "basic", function() {
	expect( 17 );
	stop();
	var cached;
	jQuery.when(
		jQuery.ajax( "data/microtime.php", {
			cache: "text",
			data: "basic",
			dataType: "json",
			beforeSend: function() {
				ok( true, "beforeSend (first request)" );
			},
			success: function( data ) {
				ok( true, "success for first request" );
				strictEqual( typeof data, "number", "result parsed" );
				cached = data;
			},
			error: function() {
				strictEqual( {}, arguments );
			}
		}).pipe(function() {
			return jQuery.ajax( "data/microtime.php", {
				cache: "text",
				data: "basic",
				dataType: "text",
				beforeSend: function() {
					ok( true, "beforeSend (chained request)" );
				},
				success: function( data ) {
					ok( true, "success for chained request" );
					strictEqual( typeof data, "string", "result not parsed (chained request)" );
					strictEqual( 1 * data, cached, "result was cached (chained request)" );
				},
				error: function() {
					strictEqual( {}, arguments );
				}
			}).done(function( data ) {
				ok( true, "done for chained request" );
				strictEqual( typeof data, "string", "result not parsed (chained request -- done)" );
				strictEqual( 1 * data, cached, "result was cached (chained request -- done)" );
			});
		}),
		jQuery.ajax( "data/microtime.php", {
			cache: "text",
			data: "basic",
			dataType: "json",
			beforeSend: function() {
				ok( true, "beforeSend (concurrent request)" );
			},
			success: function( data ) {
				ok( true, "success for concurrent request" );
				strictEqual( typeof data, "number", "result parsed (concurrent request)" );
				strictEqual( data, cached, "result was cached (concurrent request)" );
			},
			error: function() {
				strictEqual( {}, arguments );
			}
		}).done(function( data ) {
			ok( true, "done for concurrent request" );
			strictEqual( typeof data, "number", "result parsed (concurrent request -- done)" );
			strictEqual( data, cached, "result was cached (concurrent request -- done)" );
		})
	).always(function() {
		start();
	});
});

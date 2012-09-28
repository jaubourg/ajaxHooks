module( "ajax/retry", { teardown: moduleTeardown } );

test( "basic counter", function() {
	expect( 1 );
	stop();
	var count = 0,
		retries = 0;
	jQuery.ajax( "WILL_404", {
		beforeSend: function() {
			count++;
		},
		retry: function( options, jqXHR ) {
			return ( jqXHR.status === 404 ) && ( ( retries++ ) < 3 );
		}
	}).done(function() {
		strictEqual( arguments, [] );
	}).fail(function() {
		strictEqual( count, 4, "we had 3 reties" );
	}).always(function() {
		start();
	});
});

test( "test urls", function() {
	expect( 1 );
	stop();
	var URLs = [ "WILL_404_1", "WILL_404_2", "WILL_404_3", "data/proper.json" ];
	jQuery.ajax( URLs.shift(), {
		dataType: "json",
		retry: function( options, jqXHR ) {
			var newURL = jqXHR.status === 404 && URLs.shift();
			if ( newURL ) {
				options.url = newURL;
				return true;
			}
		}
	}).done(function( data ) {
		deepEqual( data, {
			"hello": 78,
			"world": "string"
		}, "proper data received" );
	}).fail(function() {
		strictEqual( arguments, [] );
	}).always(function() {
		start();
	});
});

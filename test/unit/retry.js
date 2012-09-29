module( "ajax/retry", { teardown: moduleTeardown } );

test( "basic counter", function() {
	expect( 12 );
	stop();
	var context = {},
		count = 0,
		retries = 0;
	jQuery.ajax( "WILL_404", {
		context: context,
		beforeSend: function() {
			count++;
		},
		retry: function( options, jqXHR ) {
			strictEqual( this, context, "context ok (retry)" );
			return ( jqXHR.status === 404 ) && ( ( retries++ ) < 3 );
		},
		error: function() {
			strictEqual( this, context, "context ok (error)" );
			strictEqual( count, 4, "we had 3 retries (error)" );
		},
		complete: function() {
			strictEqual( this, context, "context ok (internal complete)" );
			strictEqual( count, 4, "we had 3 retries (internal complete)" );
		}
	}).done(function() {
		strictEqual( arguments, [] );
	}).fail(function() {
		strictEqual( this, context, "context ok (fail)" );
		strictEqual( count, 4, "we had 3 retries (fail)" );
	}).complete(function() {
		strictEqual( this, context, "context ok (external complete)" );
		strictEqual( count, 4, "we had 3 retries (external complete)" );
	}).always(function() {
		start();
	});
});

test( "test urls (success)", function() {
	expect( 9 );
	stop();
	var context = {},
		URLs = [ "WILL_404_1", "WILL_404_2", "WILL_404_3", "data/proper.json" ];
	jQuery.ajax( URLs.shift(), {
		context: context,
		dataType: "json",
		retry: function( options, jqXHR ) {
			var newURL = jqXHR.status === 404 && URLs.shift();
			strictEqual( this, context, "context ok (retry)" );
			if ( newURL ) {
				options.url = newURL;
				return true;
			}
		},
		success: function( data ) {
			strictEqual( this, context, "context ok (success)" );
			deepEqual( data, {
				"hello": 78,
				"world": "string"
			}, "proper data received (success)" );
		},
		complete: function() {
			strictEqual( this, context, "context ok (internal complete)" );
		}
	}).done(function( data ) {
		strictEqual( this, context, "context ok (done)" );
		deepEqual( data, {
			"hello": 78,
			"world": "string"
		}, "proper data received (done)" );
	}).fail(function() {
		strictEqual( arguments, [] );
	}).complete(function() {
		strictEqual( this, context, "context ok (external complete)" );
	}).always(function() {
		start();
	});
});

test( "test urls (fail)", function() {
	expect( 15 );
	stop();
	var URLs = [ "WILL_404_1", "WILL_404_2", "WILL_404_3" ],
		context = {};
	jQuery.ajax( URLs.shift(), {
		context: context,
		dataType: "json",
		retry: function( options, jqXHR ) {
			strictEqual( this, context, "context ok (retry)" );
			var newURL = jqXHR.status === 404 && URLs.shift();
			if ( newURL ) {
				options.url = newURL;
				return true;
			}
		},
		error: function( jqXHR, type, error ) {
			strictEqual( this, context, "context ok (error)" );
			strictEqual( jqXHR.status, 404, "404 detected (error)" );
			strictEqual( type, "error", "error type OK (error)" );
			strictEqual( error, "Not Found", "status text OK (error)" );
		},
		complete: function( jqXHR ) {
			strictEqual( this, context, "context ok (internal complete)" );
			strictEqual( jqXHR.status, 404, "404 detected (internal complete)" );
		}
	}).done(function( data ) {
		strictEqual( arguments, [] );
	}).fail(function( jqXHR, type, error ) {
		strictEqual( this, context, "context ok (fail)" );
		strictEqual( jqXHR.status, 404, "404 detected (fail)" );
		strictEqual( type, "error", "error type OK (fail)" );
		strictEqual( error, "Not Found", "status text OK (fail)" );
	}).complete(function( jqXHR ) {
		strictEqual( this, context, "context ok (external complete)" );
		strictEqual( jqXHR.status, 404, "404 detected (external complete)" );
	}).always(function() {
		start();
	});
});

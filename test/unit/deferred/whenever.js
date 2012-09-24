module( "deferred/whenever", { teardown: moduleTeardown } );

test( "single value" , function() {

	expect( 44 );

	// Some other objects
	jQuery.each( {

		"an empty string": "",
		"a non-empty string": "some string",
		"zero": 0,
		"a number other than zero": 1,
		"true": true,
		"false": false,
		"null": null,
		"undefined": undefined,
		"a plain object": {}

	} , function( message , value ) {

		ok( jQuery.isFunction( jQuery.whenever( value ).done(function( resolveValue ) {
			strictEqual( this, window, "Context is the global object with " + message );
			strictEqual( resolveValue.state , "resolved" , "Test the promise was resolved" );
			strictEqual( resolveValue.value , value , "Test the promise was resolved with " + message );
		}).promise ) , "Test " + message + " triggers the creation of a new Promise" );

	} );

	ok( jQuery.isFunction( jQuery.whenever().done(function( resolveValue ) {
		strictEqual( this, window, "Test the promise was resolved with window as its context" );
		strictEqual( resolveValue.state , "resolved" , "Test the promise was resolved" );
		strictEqual( resolveValue.value, undefined, "Test the promise was resolved with no parameter" );
	}).promise ) , "Test calling when with no parameter triggers the creation of a new Promise" );

	var context = {};

	jQuery.whenever( jQuery.Deferred().resolveWith( context ) ).done(function() {
		strictEqual( this, context, "when( promise ) propagates context" );
	});

	var cache;

	jQuery.each([ 1, 2, 3 ], function(k, i) {

		jQuery.whenever( cache || jQuery.Deferred( function() {
				this.resolve( i );
			})
		).done(function( value ) {
			strictEqual( value.value, 1 , "Function executed" + ( i > 1 ? " only once" : "" ) );
			cache = value.value;
		});

	});
});

test("joined", function() {

	expect( 156 );

	var deferreds = {
			value: 1,
			success: jQuery.Deferred().resolve( 1 ),
			error: jQuery.Deferred().reject( 0 ),
			futureSuccess: jQuery.Deferred().notify( true ),
			futureError: jQuery.Deferred().notify( true ),
			notify: jQuery.Deferred().notify( true )
		},
		willSucceed = {
			value: true,
			success: true,
			futureSuccess: true
		},
		willError = {
			error: true,
			futureError: true
		},
		willNotify = {
			futureSuccess: true,
			futureError: true,
			notify: true
		};

	jQuery.each( deferreds, function( id1, defer1 ) {
		jQuery.each( deferreds, function( id2, defer2 ) {
			var expected = 
					( willSucceed[ id1 ] || willError[ id1 ] )
					&& ( willSucceed[ id1 ] || willError[ id1 ] )
					&& jQuery.map( [ id1, id2 ], function( id ) {
						return {
							state: willSucceed[ id ] ? "resolved" : "rejected",
							value:  willSucceed[ id ] ? 1 : 0
						};
					}),
				expectedNotify = ( willNotify[ id1 ] || willNotify[ id2 ] ) && [ willNotify[ id1 ], willNotify[ id2 ] ],
				code = id1 + "/" + id2,
				context1 = defer1 && jQuery.isFunction( defer1.promise ) ? defer1 : window,
				context2 = defer2 && jQuery.isFunction( defer2.promise ) ? defer2 : window;

			jQuery.whenever( defer1, defer2 ).done(function( a, b ) {
				deepEqual( [ a, b ], expected, code + " => resolve" );
				strictEqual( this[ 0 ], context1, code + " => first context OK" );
				strictEqual( this[ 1 ], context2, code + " => second context OK" );
			}).fail(function( a, b ) {
				ok( false ,  code + " => reject" );
			}).progress(function( a, b ) {
				deepEqual( [ a, b ], expectedNotify, code + " => progress" );
				strictEqual( this[ 0 ], expectedNotify[ 0 ] ? context1 : undefined, code + " => first context OK" );
				strictEqual( this[ 1 ], expectedNotify[ 1 ] ? context2 : undefined, code + " => second context OK" );
			});
		} );
	} );
	deferreds.futureSuccess.resolve( 1 );
	deferreds.futureError.reject( 0 );
});

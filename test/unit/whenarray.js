module( "whenarray", { teardown: moduleTeardown } );

test("when", function() {

	expect( 119 );

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
			var shouldResolve = willSucceed[ id1 ] && willSucceed[ id2 ],
				shouldError = willError[ id1 ] || willError[ id2 ],
				shouldNotify = willNotify[ id1 ] || willNotify[ id2 ],
				expected = shouldResolve ? [ 1, 1 ] : [ 0, undefined ],
					expectedNotify = shouldNotify && [ willNotify[ id1 ], willNotify[ id2 ] ],
					code = id1 + "/" + id2,
					context1 = defer1 && jQuery.isFunction( defer1.promise ) ? defer1 : undefined,
					context2 = defer2 && jQuery.isFunction( defer2.promise ) ? defer2 : undefined;

			jQuery.whenArray( [ defer1, defer2 ] ).done(function( a, b ) {
				if ( shouldResolve ) {
					deepEqual( [ a, b ], expected, code + " => resolve" );
					strictEqual( this[ 0 ], context1, code + " => first context OK" );
					strictEqual( this[ 1 ], context2, code + " => second context OK" );
				} else {
					ok( false ,  code + " => resolve" );
				}
			}).fail(function( a, b ) {
				if ( shouldError ) {
					deepEqual( [ a, b ], expected, code + " => reject" );
				} else {
					ok( false ,  code + " => reject" );
				}
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


test("whenever", function() {

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
					( willSucceed[ id1 ] || willError[ id1 ] ) &&
					( willSucceed[ id1 ] || willError[ id1 ] ) &&
					jQuery.map( [ id1, id2 ], function( id ) {
						return {
							state: willSucceed[ id ] ? "resolved" : "rejected",
							value:  willSucceed[ id ] ? 1 : 0
						};
					}),
				expectedNotify =
					( willNotify[ id1 ] || willNotify[ id2 ] ) &&
					[ willNotify[ id1 ], willNotify[ id2 ] ],
				code = id1 + "/" + id2,
				context1 = defer1 && jQuery.isFunction( defer1.promise ) ? defer1 : window,
				context2 = defer2 && jQuery.isFunction( defer2.promise ) ? defer2 : window;

			jQuery.wheneverArray( [ defer1, defer2 ] ).done(function( a, b ) {
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

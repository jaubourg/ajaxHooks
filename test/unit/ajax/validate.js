module( "ajax/validate", { teardown: moduleTeardown } );

test( "error returned", function() {
	expect( 6 );
	jQuery.ajax( "NOT_A_REAL_URL", {
		data: {
			field: 3
		},
		validate: function( data ) {
			if ( data.field > 2 ) {
				return "bad field";
			}
		},
		error: function( jqXHR, type, error ) {
			strictEqual( type, "validationerror", "Type of error OK (error callback)" );
			strictEqual( error, "bad field", "Error itself OK (error callback)" );
			jqXHR.fail(function( jqXHR, type, error ) {
				strictEqual( type, "validationerror", "Type of error OK (fail in error callback)" );
				strictEqual( error, "bad field", "Error itself OK (fail in error callback)" );
			});
		}
	}).fail(function( jqXHR, type, error ) {
		strictEqual( type, "validationerror", "Type of error OK (fail callback)" );
		strictEqual( error, "bad field", "Error itself OK (fail callback)" );
	});
});

test( "error thrown", function() {
	expect( 6 );
	jQuery.ajax( "NOT_A_REAL_URL", {
		data: {
			field: 3
		},
		validate: function( data ) {
			if ( data.field > 2 ) {
				throw "bad field";
			}
		},
		error: function( jqXHR, type, error ) {
			strictEqual( type, "validationerror", "Type of error OK (error callback)" );
			strictEqual( error, "bad field", "Error itself OK (error callback)" );
			jqXHR.fail(function( jqXHR, type, error ) {
				strictEqual( type, "validationerror", "Type of error OK (fail in error callback)" );
				strictEqual( error, "bad field", "Error itself OK (fail in error callback)" );
			});
		}
	}).fail(function( jqXHR, type, error ) {
		strictEqual( type, "validationerror", "Type of error OK (fail callback)" );
		strictEqual( error, "bad field", "Error itself OK (fail callback)" );
	});
});

module( "ajax/validate", { teardown: moduleTeardown } );

test( "error returned", function() {
	expect( 14 );
	var context = {};
	jQuery.ajax( "NOT_A_REAL_URL", {
		context: context,
		data: {
			field: 3
		},
		validate: function( data ) {
			strictEqual( this, context, "context ok (validate callback)" );
			if ( data.field > 2 ) {
				return "bad field";
			}
		},
		error: function( jqXHR, type, error ) {
			strictEqual( this, context, "context ok (error callback)" );
			strictEqual( type, "validationerror", "Type of error OK (error callback)" );
			strictEqual( error, "bad field", "Error itself OK (error callback)" );
			jqXHR.fail(function( jqXHR, type, error ) {
				strictEqual( this, context, "context ok (fail in error callback)" );
				strictEqual( type, "validationerror", "Type of error OK (fail in error callback)" );
				strictEqual( error, "bad field", "Error itself OK (fail in error callback)" );
			});
		},
		complete: function( jqXHR, type ) {
			strictEqual( this, context, "context ok (internal complete callback)" );
			strictEqual( type, "validationerror", "Type of error OK (internal complete callback)" );
		}
	}).fail(function( jqXHR, type, error ) {
		strictEqual( this, context, "context ok (fail callback)" );
		strictEqual( type, "validationerror", "Type of error OK (fail callback)" );
		strictEqual( error, "bad field", "Error itself OK (fail callback)" );
	}).complete(function( jqXHR, type ) {
		strictEqual( this, context, "context ok (external complete callback)" );
		strictEqual( type, "validationerror", "Type of error OK (external complete callback)" );
	});
});

test( "error thrown", function() {
	expect( 14 );
	var context = {};
	jQuery.ajax( "NOT_A_REAL_URL", {
		context: context,
		data: {
			field: 3
		},
		validate: function( data ) {
			strictEqual( this, context, "context ok (validate callback)" );
			if ( data.field > 2 ) {
				throw "bad field";
			}
		},
		error: function( jqXHR, type, error ) {
			strictEqual( this, context, "context ok (error callback)" );
			strictEqual( type, "validationerror", "Type of error OK (error callback)" );
			strictEqual( error, "bad field", "Error itself OK (error callback)" );
			jqXHR.fail(function( jqXHR, type, error ) {
				strictEqual( this, context, "context ok (fail in error callback)" );
				strictEqual( type, "validationerror", "Type of error OK (fail in error callback)" );
				strictEqual( error, "bad field", "Error itself OK (fail in error callback)" );
			});
		},
		complete: function( jqXHR, type ) {
			strictEqual( this, context, "context ok (internal complete callback)" );
			strictEqual( type, "validationerror", "Type of error OK (internal complete callback)" );
		}
	}).fail(function( jqXHR, type, error ) {
		strictEqual( this, context, "context ok (fail callback)" );
		strictEqual( type, "validationerror", "Type of error OK (fail callback)" );
		strictEqual( error, "bad field", "Error itself OK (fail callback)" );
	}).complete(function( jqXHR, type ) {
		strictEqual( this, context, "context ok (external complete callback)" );
		strictEqual( type, "validationerror", "Type of error OK (external complete callback)" );
	});
});

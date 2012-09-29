module( "ajax/css", { teardown: moduleTeardown } );

test( "local", function() {
	expect( 2 );
	var div = jQuery( "<div id='css-test-div-id'></div>" ).appendTo( "#qunit-fixture" ),
		request = jQuery.ajax({
			url: "data/css.php?wait=1&id=css-test-div-id",
			dataType: "css"
		});
	stop();
	request.done(function( link ) {
		ok( true, "success" );
		strictEqual( div.css("marginLeft") , "27px" , "rule is applied" );
		link.remove();
	}).fail(function() {
		strictEqual( arguments, undefined );
	}).always( start );
});

test( "remote", function() {
	expect( 2 );
	var div = jQuery("<div class='ui-icon'></div>").appendTo( "#qunit-fixture" ),
		request = jQuery.ajax({
			url: "//ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-lightness/jquery-ui.css",
			dataType: "css"
		});
	stop();
	request.done(function( link ) {
		ok(true, "success");
		var textIndent = 1 * div.css( "textIndent" ).replace( /px/, "" );
		// Opera 16bits capping
		if ( textIndent === -32768 ) {
			strictEqual( textIndent, -32768, "rule is applied (opera)" );
		} else {
			strictEqual( textIndent, -99999, "rule is applied" );
		}
		link.remove();
	}).fail(function() {
		strictEqual( arguments, undefined );
	}).always( start );
});

test( "abort", function() {
	expect( 2 );
	var div = jQuery( "<div id='css-test-div-abort-id'></div>" ).appendTo( "#qunit-fixture" ),
		request = jQuery.ajax({
			url: "data/css.php?wait=1&id=css-test-div-abort-id",
			dataType: "css"
		});
	stop();
	request.done(function() {
		ok( false, "success" );
	}).fail(function() {
		ok( true, "error" );
		setTimeout( function() {
			notStrictEqual( div.css("marginLeft") , "27px" , "rule is not applied" );
			start();
		}, 1500 );
	}).abort();
});

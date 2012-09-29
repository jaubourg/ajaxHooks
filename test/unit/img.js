module( "ajax/img", { teardown: moduleTeardown } );

test( "success", function() {
	expect( 1 );
	stop();
	var xhr = jQuery.ajax({
		url: "data/lolbat.jpg",
		dataType: "img"
	}).done( function( image ) {
		ok( image.width, "Image preloaded" );
	}).always( start );
});

test( "error", function() {
	expect( 1 );
	stop();
	jQuery.ajax({
		url: "data/not_here.gif",
		dataType: "img"
	}).fail(function() {
		ok( true, "Image not found" );
	}).always( start );
});

test( "abort", function() {
	expect( 1 );
	stop();
	jQuery.ajax({
		url: "data/delay.php?wait=5",
		dataType: "img",
		timeout: 100
	}).fail(function(_,status) {
		strictEqual( status, "timeout", "Aborted by timeout" );
	}).always( start );
});

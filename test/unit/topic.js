module( "callbacks/topic", { teardown: moduleTeardown } );

test( "instantiate", function() {
	expect( 3 );
	notStrictEqual( jQuery.Topic(), jQuery.Topic(), "no id => new instance" );
	strictEqual( jQuery.Topic( "my/topic" ), jQuery.Topic( "my/topic" ), "same id => same instance" );
	notStrictEqual( jQuery.Topic( "my/topic" ), jQuery.Topic( "my/topic/2" ), "different id => different instance" );
});

test( "subscribe/unsubscribe", function() {
	expect( 8 );
	var topic = jQuery.Topic( "my/topic" ),
		count = 1;
	function topicFN( value1, value2 ) {
		strictEqual( value1, "str", "topic: first value OK" );
		strictEqual( value2, count, "topic: first value OK" );
	}
	function jQueryFN( value1, value2 ) {
		strictEqual( value1, "str", "jQuery: first value OK" );
		strictEqual( value2, count, "jQuery first value OK" );
	}
	topic.subscribe( topicFN );
	jQuery.subscribe( "my/topic", jQueryFN );
	topic.publish( "str", count );
	count++;
	jQuery.publish( "my/topic", "str", count );
	count++;
	topic.unsubscribe( jQueryFN );
	jQuery.unsubscribe( "my/topic", topicFN );
	topic.publish( "str", count );
	count++;
	jQuery.publish( "my/topic", "str", count );
	count++;
});

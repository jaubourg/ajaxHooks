var topics = {},
	topicSlice = [].slice;

jQuery.Topic = function( id ) {
    var callbacks,
        method,
        topic = id && topics[ id ];
    if ( !topic ) {
        callbacks = jQuery.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
        };
        if ( id ) {
            topics[ id ] = topic;
        }
    }
    return topic;
};

jQuery.each( jQuery.Topic(), function( method ) {
	jQuery[ method ] = function( topic ) {
		topic = jQuery.Topic( topic );
		topic[ method ].apply( topic, topicSlice.call( arguments, 1 ) );
	};
});

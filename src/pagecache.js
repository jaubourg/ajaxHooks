var pagecache = {};

jQuery.ajaxPrefilter(function( options ) {
	if ( options.type === "GET" && options.cache && ( typeof options.cache === "string" ) ) {
		options.global = false;
		options._url = options.url;
		return "pagecache";
	}
});

jQuery.ajaxTransport( "pagecache", function( options, originalOptions, jqXHR ) {
	// Remove redirection dataType
	options.dataTypes.shift();

	var key, cached;
	return {
		send: function( headers, complete ) {
			key = options.cache + " " + options.url;
			cached = pagecache[ key ] || ( pagecache[ key ] = jQuery.ajax( jQuery.extend( originalOptions, {
				url: options._url,
				beforeSend: null,
				cache: true,
				dataType: options.cache,
				headers: headers,
				success: null,
				error: null,
				complete: null,
				timeout: 0
			}) ) );
			cached.always(function( success ) {
				if ( cached ) {
					var responses;
					if ( cached.state() === "resolved" ) {
						responses = {};
						responses[ options.cache ] = success;
					}
					complete( cached.status, cached.statusText, responses, cached.getAllResponseHeaders() );
				}
			});
		},
		abort: function() {
			cached = undefined;
		}
	};
});

jQuery.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	if ( options.retry ) {
		var url = options.url;
		jqXHR.pipe( null, function() {
			if ( options.retry( originalOptions, jqXHR ) ) {
				return jQuery.ajax( originalOptions.url || url, originalOptions );
			}
		}).promise( jqXHR );
		if ( jqXHR.success ) {
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
		}
	}
});

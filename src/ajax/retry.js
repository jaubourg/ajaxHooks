jQuery.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	if ( options.retry ) {
		var url = options.url,
			oldPromise = jqXHR.promise();
		if ( options._retried ) {
			options.success = options.error = options.complete = undefined;
		} else {
			originalOptions = jQuery.extend( {}, originalOptions, { _retried: true } );
		}
		jqXHR.pipe( null, function() {
			if ( options.retry.call( options.context || options, originalOptions, jqXHR ) ) {
				return jQuery.ajax( originalOptions.url || url, originalOptions );
			}
			return oldPromise;
		}).promise( jqXHR );
		if ( jqXHR.success ) {
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
			jqXHR.complete = (function( callbacks ) {
				jqXHR.always(function( error, statusText, success ) {
					callbacks.fireWith( this, [ jqXHR.state() === "resolved" ? success : error ] );
				});
				return callbacks.add;
			})( jQuery.Callbacks( "once memory" ) );
		}
	}
});

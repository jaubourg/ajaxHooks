jQuery.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	var validate = options.validate;
	if ( validate && jQuery.isFunction( validate ) ) {
		var context = options.context || options,
			error;
		try {
			error = validate.call( context, originalOptions.data, options );
		} catch( e ) {
			error = e;
		}
		if ( error ) {
			jQuery.Deferred().rejectWith( context, [ jqXHR, "validationerror", error ] ).promise( jqXHR );
			if ( jqXHR.success ) {
				jqXHR.success = jqXHR.done;
				jqXHR.error = jqXHR.fail;
				jqXHR.complete = jQuery.Callbacks( "once memory" ).fireWith( context, [ jqXHR, "validationerror" ] ).add;
			}
			jqXHR.abort();
			jqXHR.fail( options.error );
			jqXHR.complete( options.complete );
		}
	}
});

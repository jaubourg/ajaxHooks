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
			jQuery.Deferred().rejectWith( this, [ jqXHR, "validationerror", error ] ).promise( jqXHR );
			if ( jqXHR.success ) {
				jqXHR.success = jqXHR.done;
				jqXHR.error = jqXHR.fail;
			}
			jqXHR.abort();
			jqXHR.fail( options.error );
		}
	}
});

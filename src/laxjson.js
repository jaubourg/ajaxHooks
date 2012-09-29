function laxjson( data ) {
	return ( new Function( "return (" + data + ");" ) )();
}

jQuery.ajaxPrefilter(function( options ) {
	if ( options.laxjson ) {
		options.converters[ "text json" ] = laxjson;
	}
});

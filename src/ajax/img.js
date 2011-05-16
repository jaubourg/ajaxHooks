(function( jQuery ) {

jQuery.ajaxPrefilter( "img", function( s ) {
	if ( s.cache == null ) {
		s.cache = false;
	}
	s.type = "GET";
	s.async = true;
});

jQuery.ajaxTransport( "img", function( s ) {
	var callback;
	return {
		send: function( _, complete ) {
			var image = new Image();
			callback = function( success ) {
				var img = image;
				callback = image = image.onload = image.onerror = null;
				if ( success != null ) {
					if ( success ) {
						complete( 200, "OK", { img: img } );
					} else {
						complete( 404, "Not Found" );
					}
				}
			};
			image = new Image();
			image.onload = function() {
				callback( true );
			};
			image.onerror = function() {
				callback( false );
			};
			image.src = s.url;
		},
		abort: function() {
			if ( callback ) {
				callback();
			}
		}
	};
});

})( jQuery );

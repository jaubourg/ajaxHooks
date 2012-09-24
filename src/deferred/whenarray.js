jQuery.each( "when whenever".split(" "), function( _, method ) {
	jQuery[ method + "Array" ] = function( array ) {
		return jQuery[ method ].apply( jQuery, array || [] );
	};
});

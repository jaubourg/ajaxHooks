jQuery.each( "when whenever".split( " " ), function( _, method ) {
	jQuery[ method + "All" ] = function( iterable, callback ) {
		return jQuery[ method ].apply( jQuery, jQuery.map( iterable, callback ) );
	};
});

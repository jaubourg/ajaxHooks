(function( jQuery ) {

var cssHead = document.head || document.getElementsByTagName( "head" )[ 0 ] || document.documentElement,
	cssEmptyURL = "data:text/css,",
	cssNeedsPolling = $.Deferred(function( defer ) {
		var onload = cssLoad( { url: cssEmptyURL }, false, function() {
				defer.resolve( false );
			});
		// Give a little room
		// so that we get the onload event
		setTimeout(function() {
			onload( true );
			defer.resolve( true );
		}, 0 );
	}),
	cssTimer,
	cssPollingId = 0,
	cssPollingNb = 0,
	cssPolled = {};

function cssGlobalPoller() {
	var id, sheet;
	for( id in cssPolled ) {
		sheet = cssPolled[ id ].sheet;
		try {
			if ( sheet && !sheet.cssRules /* <= webkit */ || sheet.cssRules.length != null /* <= firefox */ ) {
				cssPolled[ id ].onload();
			}
		} catch( e ) {
			if ( ( e.code === 1e3 ) || ( e.message === "security" || e.message === "denied" ) ) {
				cssPolled[ id ].onload();
			}
		}
	}
}

function cssLoad( s, polling, callback ) {
	var id,
		link = jQuery( "<link/>", {
			charset: s.scriptCharset || "",
			media: s.media || "all",
			rel: "stylesheet",
			type: "text/css"
		}).appendTo( cssHead )[ 0 ];
	if ( polling ) {
		cssPolled[( id = ( cssPollingId++ ) )] = link;
		if ( !( cssPollingNb++ ) ) {
			cssTimer = setInterval( cssGlobalPoller, 13 );
		}
	}
	link.onload = function( isCancel ) {
		if ( link.onload ) {
			if ( polling ) {
				delete cssPolled[ id ];
				if ( !( --cssPollingNb ) ) {
					clearInterval( cssTimer );
				}
			}
			link.onload = null;
			if ( isCancel === true ) {
				// resetting href avoids a crash in IE6
				// and a display bug in webkit
				// Using "data:text/css," ensures webkit doesn't do
				// an unnecessary network request
				link.href = cssEmptyURL;
				cssHead.removeChild( link );
			} else {
				callback( link );
			}
		}
	};
	// Only way to make it work in IE before the DOM
	// is ready is to set href after appending
	link.href = s.url;
	return link.onload;
}

jQuery.ajaxPrefilter( "css", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	s.type = "GET";
	s.async = true;
	s.global = false;
});

jQuery.ajaxTransport( "css", function( s ) {
	var cancel;
	return {
		send: function( _ , complete ) {
			cancel = jQuery.noop;
			cssNeedsPolling.done(function( needsPolling ) {
				if ( cancel ) {
					cancel = cssLoad( s, needsPolling, function( link ) {
						cancel = undefined;
						complete( 200, "OK", { css: jQuery( link ) } );
					});
				}
			});
		},
		abort: function() {
			if ( cancel ) {
				var tmp = cancel;
				cancel = undefined;
				tmp( true );
			}
		}
	};
} );

})( jQuery );

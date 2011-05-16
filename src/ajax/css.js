(function( jQuery ) {

var	cssHead = jQuery( document.head || document.getElementsByTagName( "head" )[ 0 ] || document.documentElement ),
	cssIsWebkit = jQuery.browser.webkit,
	cssNeedsPolling = cssIsWebkit || jQuery.browser.mozilla,
	cssTimer,
	cssPollingId = jQuery.now(),
	cssPollingNb = 0,
	cssPolled = {};

function cssGlobalPoller() {
	var id,
		link,
		sheet;
	for( id in cssPolled ) {
		link = cssPolled[ id ];
		sheet = link[ 0 ].sheet;
		try {
			if ( cssIsWebkit ? sheet : ( sheet.cssRules.length != null ) ) {
				link.trigger( "load" );
			}
		} catch( e ) {
			if ( ( e.code == 1e3 ) || ( e.message == "security" || e.message == "denied" ) ) {
				link.trigger( "load" );
			}
		}
	}
}

jQuery.ajaxPrefilter( "css", function( s ) {
	if ( s.cache == null ) {
		s.cache = false;
	}
	s.type = "GET";
	s.async = true;
	s.global = false;
});

jQuery.ajaxTransport("css", function(s) {
	var callback;
	return {
		send: function( _ , complete ) {
			var link, id;
			link = jQuery( "<link/>" ).attr({
				rel: "stylesheet",
				type: "text/css",
				media: s.media || "screen",
				href: s.url
			});
			if ( s.scriptCharset ) {
				link[ 0 ].charset = s.scriptCharset;
			}
			if ( cssNeedsPolling ) {
				cssPolled[( id = ( cssPollingId++ ) )] = link;
				if ( !( cssPollingNb++ ) ) {
					cssTimer = setInterval( cssGlobalPoller, 13 );
				}
			}
			link.bind( "load", ( callback = function() {
				if ( cssNeedsPolling ) {
					delete cssPolled[ id ];
					if ( !( --cssPollingNb ) ) {
						clearInterval( cssTimer );
					}
				}
				link.unbind( "load" );
				// If not aborting
				if ( callback ) {
					callback = undefined;
					setTimeout( function() {
						complete( 200, "OK", { css: link } );
					} , 0 );
				} else {
					link.remove();
				}
			} ));
			cssHead.append( link );
		},
		abort: function() {
			if ( callback ) {
				var tmp = callback;
				callback = undefined;
				tmp();
			}
		}
	};
});

})( jQuery );

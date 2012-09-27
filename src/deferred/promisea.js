jQuery.Deferred = (function( Deferred ) {

	var methods = {
			done: "resolve",
			fail: "reject",
			progress: "notify"
		};

	// Takes a callback and embeds it into a Promise/A enabler
	// To be consumed by jQuery's implementation
	function catchAndReject( targetDefer, fn, toResolve ) {
		return function( value ) {
			// No need to do anything if already resolved/rejected
			if ( targetDefer.state() !== "pending" ) {
				return;
			}
			// Call the function and get value or error
			var success, error;
			try {
				success = fn( value );
			} catch( e ) {
				error = e;
			}
			// Choose the correct method to call on the Deferred
			// and call it
			(
				error ?
				targetDefer.reject :
				(
					toResolve ?
					targetDefer.resolve :
					targetDefer.notify
				)
			)( error || success );
		};
	}

	function then( defer ) {
		return function() {
			var redirect = jQuery.Deferred(),
				i = 0, method, fn;
			for ( method in methods ) {
				fn = arguments[ i ];
				defer[ method ]( fn && jQuery.isFunction( fn ) ?
					( catchAndReject( redirect, fn, i < 2 ) ) :
					redirect[ methods[ method ] ]
				);
				i++;
			}
			return redirect.promiseA();
		};
	}

	return function( fn ) {
		var defer = Deferred(),
			promise = {
				then: then( defer )
			};
		defer.promiseA = function() {
			return promise;
		};
		if ( fn ) {
			fn.call( defer, defer );
		}
		return defer;
	};

})( jQuery.Deferred );

var wheneverSlice = [].slice;

jQuery.whenever = function( subordinate /* , ..., subordinateN */ ) {
	var i = 0,
		resolveValues = wheneverSlice.call( arguments ),
		length = resolveValues.length || 1,

		// the count of uncompleted subordinates
		remaining = length,

		// the master Deferred
		deferred = jQuery.Deferred(),

		// Update function for both resolve and progress values
		updateFunc = function( i, contexts, values, state ) {
			return function( value ) {
				contexts[ i ] = this;
				values[ i ] = arguments.length > 1 ? wheneverSlice.call( arguments ) : value;
				if ( state ) {
					values[ i ] = {
						state: state,
						value: values[ i ]
					};
					if ( !( --remaining ) ) {
						if ( length === 1 ) {
							deferred.resolveWith( contexts[ 0 ], [ values[ 0 ] ] );
						} else {
							deferred.resolveWith( contexts, values );
						}
					}
				} else {
					deferred.notifyWith( contexts, values );
				}
			};
		},

		progressValues = new Array( length ),
		progressContexts = new Array( length ),
		resolveContexts = new Array( length );

	// add listeners to Deferred subordinates; treat others as resolved
	for ( ; i < length; i++ ) {
		if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
			resolveValues[ i ].promise()
				.progress( updateFunc( i, progressContexts, progressValues ) )
				.done( updateFunc( i, resolveContexts, resolveValues, "resolved" ) )
				.fail( updateFunc( i, resolveContexts, resolveValues, "rejected" ) );
		} else {
			updateFunc( i, resolveContexts, resolveValues, "resolved" )( resolveValues[ i ] );
		}
	}

	return deferred.promise();
};

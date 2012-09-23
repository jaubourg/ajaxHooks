/**
 * Resources
 *
 * https://gist.github.com/2489540
 *
 */

/*jshint node: true */
/*global config:true, task:true, process:true*/
module.exports = function( grunt ) {

	// readOptionalJSON
	// by Ben Alman
	// https://gist.github.com/2876125
	function readOptionalJSON( filepath ) {
		var data = {};
		try {
			data = grunt.file.readJSON( filepath );
			grunt.verbose.write( "Reading " + filepath + "..." ).ok();
		} catch(e) {}
		return data;
	}
	
	function jshintrc( path ) {
		return readOptionalJSON( ( path || "" ) + ".jshintrc" ) || {};
	}

	var distpaths = [
			"dist/jquery.ajaxhooks.js",
			"dist/jquery.ajaxhooks.min.js"
		],
		files = (function() {
			var files = [ "build/intro.js" ],
				module;
			for( module in readOptionalJSON( "build/modules.json" ) ) {
				files.push( "src/" + module + ".js" );
			}
			files.push( "build/outro.js" );
			return files;
		})();

	grunt.initConfig({
		pkg: "<json:package.json>",
		dst: "dist",
		build: {
			"dist/jquery.ajaxhooks.js": files
		},
		min: {
			"dist/jquery.ajaxhooks.min.js": [ "dist/jquery.ajaxhooks.js" ]
		},

		lint: {
			dist: "dist/jquery.ajaxhooks.js",
			grunt: "grunt.js",
			tests: "test/unit/**/*.js"
		},

		jshint: {
			options: jshintrc(),
			dist: jshintrc( "src/" ),
			tests: jshintrc( "test/" )
		},

		uglify: {}
	});

	grunt.registerTask( "default", "submodules build lint min" );

	grunt.registerMultiTask(
		"build",
		"Concatenate source (include/exclude modules with +/- flags), embed date/version",
		function() {
			// Concat specified files.
			var name = this.file.dest,
				version = grunt.config( "pkg.version" ),
				compiled = "";

			// append commit id to version
			if ( process.env.COMMIT ) {
				version += "-" + process.env.COMMIT;
			}

			// conditionally concatenate source
			this.file.src.forEach(function( filepath ) {
				compiled += grunt.file.read( filepath );
			});

			// Embed Date
			// Embed Version
			compiled = compiled.replace( "@DATE", new Date() )
				.replace( /@VERSION/g, version );

			// Write concatenated source to file
			grunt.file.write( name, compiled );

			// Fail task if errors were logged.
			if ( this.errorCount ) {
				return false;
			}

			// Otherwise, print a success message.
			grunt.log.writeln( "File '" + name + "' created." );
		});

	grunt.registerTask( "submodules", function() {
		var done = this.async();

		grunt.verbose.write( "Updating submodules..." );

		// TODO: migrate remaining `make` to grunt tasks
		//
		grunt.utils.spawn({
			cmd: "make"
		}, function( err, result ) {
			if ( err ) {
				grunt.verbose.error();
				done( err );
				return;
			}

			grunt.log.writeln( result );

			done();
		});
	});

};

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
			"dist/ajaxhooks.js",
			"dist/ajaxhooks.min.js"
		],
		files = (function() {
			var files = [ "build/intro.js" ];
			grunt.file.recurse( "src", function( path ) {
				if ( /\.js$/.test( path ) ) {
					files.push( path );
				}
			});
			files.push( "build/outro.js" );
			return files;
		})();

	grunt.initConfig({
		pkg: "<json:package.json>",
		dst: "dist",
		build: {
			"dist/ajaxhooks.js": files
		},
		min: {
			"dist/ajaxhooks.min.js": [ "dist/ajaxhooks.js" ]
		},
		lint: {
			src: "src/*.js",
			dist: "dist/ajaxhooks.js",
			tests: "test/unit/*.js",
			grunt: "grunt.js"
		},
		jshint: {
			options: jshintrc(),
			src: jshintrc( "src/" ),
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
		var done = this.async(),
			cp = require("child_process");

		grunt.verbose.write( "Updating submodules..." );

		cp.exec( "git submodule", function( err, stdout, stderr ) {
			if ( err || stderr ) {
				grunt.verbose.error();
				done( err || stderr );
				return;
			}
			var cmd = "git submodule update --init --recursive" +
					( /(?:^|\n)-/.test( stdout ) ? "" : " --merge" );

			grunt.log.writeln( cmd );

			cp.exec( cmd, function( err, stdout, stderr ) {
				if ( err || stderr ) {
					grunt.verbose.error();
					done( err || stderr );
					return;
				}
				done();
			});
		});
	});
};

#!/usr/bin/env node

var modulesDefinitionFile = process.argv[2],
	srcDir = process.argv[3] + "/",
	print = require( "sys" ).print,
	fs = require( "fs" ),
	modules = JSON.parse( fs.readFileSync( modulesDefinitionFile, "utf8" ) ),
	makefileModules = [];

for( var m in modules ) {
	makefileModules.push( srcDir, m, ".js " );
}

print( makefileModules.join( "" ) );

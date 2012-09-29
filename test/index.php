<?php

	$jquery_version = isset( $_GET[ "jquery" ] ) ? $_GET[ "jquery" ] : "local";

	if( $jquery_version === "local" ) {
		$jquery_lib = "jquery.min.js";
	} else {
		if ( $jquery_version !== "git" ) {
			$jquery_version .= ".min"; 
		}
		$jquery_lib = "//code.jquery.com/jquery-$jquery_version.js";
	}
	
	function getScriptsFrom( $dir ) {
		if (( $dirH = opendir( $dir ) )) {
			while( ( $file = readdir( $dirH ) ) !== false ) {
				if ( strripos( $file, ".js", 0 ) === ( strlen( $file ) - 3 ) ) {
					echo "\n\t<script src='$dir/$file'></script>";
				}
			}
			closedir( $dirH );
		}
	}
	
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr" id="html">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title>jQuery ajaxHooks Test Suite</title>

	<link rel="Stylesheet" media="screen" href="qunit/qunit/qunit.css" />

	<script src="<?= $jquery_lib ?>"></script>

	<?php
		getScriptsFrom( "../src" );
	?>

	<script src="qunit/qunit/qunit.js"></script>
	<script src="init.js"></script>

	<?php
		getScriptsFrom( "unit" );
	?>

</head>
<body id="body">
	<h1 id="qunit-header"><a href="./index.html">jQuery ajaxHooks Test Suite</a></h1>
	<h2 id="qunit-banner"></h2>
	<div id="qunit-testrunner-toolbar"></div>
	<h2 id="qunit-userAgent"></h2>
	<ol id="qunit-tests"></ol>
	<div id="qunit-fixture"></div>
</body>
</html>

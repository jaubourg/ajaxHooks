<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr" id="html">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title>jQuery ajaxHooks Test Suite</title>

	<link rel="Stylesheet" media="screen" href="qunit/qunit/qunit.css" />

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>

	<?php
		$modules = json_decode( file_get_contents( "../build/data/modules.json" ), true );
		foreach( $modules as $module => $_ ) {
			?><script src="../src/<?= $module ?>.js"></script><?php
		}
	?>

	<script src="qunit/qunit/qunit.js"></script>
	<script src="init.js"></script>

	<?php
		foreach( $modules as $module => $_ ) {
			?><script src="unit/<?= $module ?>.js"></script><?php
		}
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

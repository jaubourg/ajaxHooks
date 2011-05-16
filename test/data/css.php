<?php
error_reporting( 0 );
$wait = $_REQUEST[ "wait" ];
if( $wait ) {
	sleep( $wait );
}

header( "Content-Type: text/css; charset=UTF-8" );
?>
#<?= $_REQUEST[ "id" ] ?> {
	margin: 27px;
}

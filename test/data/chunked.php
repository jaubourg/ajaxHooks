<?php

header( "Access-Control-Allow-Origin: *" );
echo "hello\n";
flush();
ob_flush();
sleep( 1 );
echo "wo";
flush();
ob_flush();
sleep( 1 );
echo "rld";

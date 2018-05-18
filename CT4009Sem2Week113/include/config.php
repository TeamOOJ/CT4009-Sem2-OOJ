<?php

$servername="localhost";
$username="s1703680_user";
$password="CT&0*a#8)u*P";
$dbname="s1703680_flogger";

	$connection = new mysqli($servername, $username, $password, $dbname);

	if($connection->connect_error) {
		echo $connection->connect_error;
	}
?>
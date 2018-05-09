<?php

	$debugMode = true;

	$servername = "localhost";
	$username = "s1712027_oscar";
	$password = "JgUwor0IpCxG";
	$dbname = "s1712027_glosPolice";

	$connection = new mysqli($servername, $username, $password, $dbname);

	if ($connection->connect_error) {
		echo "ERROR: " . $connection->connect_error;
	}
?>
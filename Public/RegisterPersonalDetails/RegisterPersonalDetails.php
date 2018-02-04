<?php

########
# TODO #
########
# What: Grab form data and store in variables using PHP
# Who: Olivia Arnell, Josh Jackson
# Trello card: https://trello.com/c/eYyy0w5P

$firstName = $_POST("fName");
$lastName = 
$dateOfBirth = 
$telephoneNum = 
$email = 
$pass = 
$passConfirm = 





########
# TODO #
########
# What: Store grabbed form data into the users table in the MySQL database
# Who: Oscar Nardone
# Trello card: https://trello.com/c/eYyy0w5P

# http://php.net/manual/en/mysqli.quickstart.statements.php

$dbAddress = "localhost";
$dbUsername = "username";
$dbPassword = "password";
$dbName = "glosContabulary";

$mysqli = new mysqli($dbAddress, $dbUsername, $dbPassword, $dbName); # Create a new MySQLi object that connects to localhost with the login details and database name
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error; # if it fails to connect, show an error and give details
} else {
    echo "Successfully connected to MySQL."; # if it succeeds, say that it's connected fine
}

if (!$mysqli->query("INSERT INTO `usersTable` (`PrimaryKey`, `firstName`, `lastName`, `dateOfBirth`, `telephoneNum`, `email`, `pass`, `passConfirm`) VALUES (NULL, '$firstName', '$lastName', '$dateOfBirth', '$telephoneNum', '$email', '$pass', '$passConfirm')")) {
    echo "Error: (" . $mysqli->errno . ") " . $mysqli->error;
} else {
    echo "Successfully added new row to table usersTable.";
}


?>
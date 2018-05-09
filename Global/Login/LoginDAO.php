<?php

require_once '../config.php';
require_once '../common.php';

if ($_POST['phpFunction'] == 'Login') {
	login();
}

function login() {
	session_start();
	include '../config.php';
	
	$email = $_POST['email'];
	$pass = $_POST['pass'];
	
	// To protect MySQL injection for security purpose
	//$uName = stripslashes( $uName );
	//$pWord = stripslashes( $pWord );
	
	//$uName = mysqli_escape_string( $connection, $uName );
	//$pWord = mysqli_escape_string( $connection,$pWord );
	
    //SQL to glean first and last name from verified email and password
	$sql = "SELECT * FROM `usersTable` WHERE email='".$email."' AND isVerified = '1' LIMIT 1";
	
	//echo $sql;
	
	$res = mysqli_query($connection, $sql);
	$num_row = mysqli_num_rows($res);
	$row = mysqli_fetch_assoc($res);
	
	//Save succesfully login email to session

	if ($debugMode) {
		echo "DEBUG: num_row: " . $num_row . "<br>";
		echo "DEBUG: row: " . $row . "<br>";
		echo "DEBUG: row[password]: " . $row["password"] . "<br>";
		echo "DEBUG: pass: " . $pass . "<br>";
	}
	
	if ($num_row == 1) {
		//if (password_verify($pass, $row['password'])) {
		if (SHA1($pass) == $row['password']) {
			//echo json_encode($row);
			if ($debugMode) {
				echo "DEBUG: " . $row["userID"]; // the contents of userID from the database query selection
			}

			$_SESSION['userID'] = $row["userID"];
			$_SESSION['privledges'] = $row["privledges"];
			
			// https://stackoverflow.com/questions/768431/how-to-make-a-redirect-in-php
			// http://thedailywtf.com/articles/WellIntentioned-Destruction

			if ($row["privledges"] > 0) { // go to the police homepage if the user privledges value is more than zero. Zero is for public users, anything above is for staff.
				echo '<meta http-equiv="refresh" content="1;url=../../Police/Home/Home.php">';
			} else {
				echo '<meta http-equiv="refresh" content="1;url=../../Public/Home/Home.php">';
			}
			die();
		} else {
			echo 'Error logging in. Ensure that your email and password combination is correct, and that your account has been verified using the link sent to your email.';
		}
	} else {
		echo 'Error logging in. Ensure that your email is correct, and that your account has been verified using the link sent to your email.';
	}
}
?>
<?php

	if ($_POST['phpFunction'] == 'updateUser') {
		updateUser();
	} else if ($_GET['phpFunction'] == 'verifyUser') {
		verifyUser();
	} else {
		echo "Unknown function error.";
		echo "Got: ". $_POST['phpFunction'];
	}

	function updateUser() {
		$firstName = $_POST['firstName'];
		$lastName = $_POST['lastName'];
		$dateOfBirth = $_POST['dateOfBirth'];
		$telephoneNum = $_POST['telephoneNum'];
		$email = $_POST['email'];
		$pass = $_POST['pass'];

		//$verificationcode = substr(sha1(uniqid(mt_rand(), true)), 16,16);
		// using mt_rand() instead of rand() yields much better performance (upto 4x faster)
		// using SHA1 instead of MD5 reduces load on the server, improves performance and reduces collison rates
		
		include "../config.php";

		session_start();
		session_regenerate_id(true);
		$userID = $_SESSION["userID"];
		
		$sql = "SELECT * FROM `usersTable` WHERE email='$email'";
		$query = mysqli_query($connection, $sql);
		
		/*
		if (mysqli_num_rows($query) > 0){
			echo "Sorry, this email is already registered.";
			return;
		}*/
				
		$sql = "UPDATE `usersTable` SET `firstName`='" . $firstName . "', `lastName`='" . $lastName . "', `dateOfBirth`='" . $dateOfBirth . "', `telephoneNumber`='" . $telephoneNum . "', `email`='" . $email . "' WHERE `userID`='" . $userID . "'";
		
		if (mysqli_query($connection, $sql)) {
			if ($debugMode) {
				echo "DEBUG: Successfully updated row in table in the database.";
				echo $sql;
			}
			echo '<meta http-equiv="refresh" content="1;url=YourProfile.php">';
			die();
		} else {
			if ($debugMode) {
				echo "DEBUG: " . mysqli_error($connection);
			}
		}
		
		//sendEmail($email, $verificationcode);
		
		mysqli_close($connection);
	} 

	function verifyUser() {
		$email = $_GET['email'];
		$verificationcode = $_GET['verificationcode'];

		if ($debugMode) {
			echo "DEBUG: \r\n";
			echo "Email: " . $email . "\r\n";
			echo "verificationCode: " . $verificationcode . "\r\n";
		}
		
		include "../config.php";
		
		$sql = "UPDATE `usersTable` ".
				"SET isVerified='1' ".
				"WHERE email = '$email' AND verificationCode = '$verificationcode'";
		
		if (mysqli_query($connection, $sql)) {
			echo 'Your account from '.$email. ' has been successfully verified.';
		} else {
			echo "Sorry, but an error occurred trying to verify your account. Please try again later.";
			if ($debugMode) {
				echo mysqli_error($connection);
			}
		}
	} 

	function sendEmail($emailTo, $verificationcode) {
		$from="s1712027@connect.glos.ac.uk";
		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

		//Create email headers

		$headers .= 'From: '.$from. "\r\n".
			'Reply-To: '.$from."\r\n" .
			'X-Mailer: PHP/' . phpversion();

		// Compose the message of the email
		$body = 'Thank you for registering. <br>';
		$body = $body.'Please click the link below to activate your account. <br>';
		$link = 'http://ct4009-17am.studentsites.glos.ac.uk/TeamOOO-Sem2/Public/RegisterPersonalDetails/RegisterPersonalDetailsDAO.php?'.
				'phpFunction=verifyUser&email='.$emailTo.
				'&verificationcode='.$verificationcode;
		$link = '<a href="'.$link.'">Click here</a>';
		$body = $body.$link;
		$message = '<html><body>';
		$message .= $body;
		$message .= '</body></html>';

		if (mail($emailTo, $subject, $message, $headers)){
			echo 'Please check your email for a link to verify your account and complete registration.';
		} else {
			echo 'An error occurred trying to email you. Try again later.';
		}
	}
?>
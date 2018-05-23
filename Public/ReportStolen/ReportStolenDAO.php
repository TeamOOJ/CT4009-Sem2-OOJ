<?php

	if ($_POST['phpFunction'] == 'reportBike') {
		reportBike();
	}
	if ($_GET['phpFunction'] == 'verifyUser') {
		verifyUser();
	}

	function reportBike() {
		if ($debugMode) {
			echo "Entered the reportBike function.";
		}
		$bikeID = $_POST["bikeID"];
		$theftDate = $_POST["theftDate"];
		$theftTime = $_POST["theftTime"];
		$theftLocation = $_POST["theftLocation"];
		$theftLastKnownLocation = $_POST["theftLastKnownLocation"];

		session_start();
		session_regenerate_id(true);
		$ownerID = $_SESSION["userID"];
		
		include "../../Global/config.php";
		
		/*
		$sql = "SELECT * FROM `bikesTable` WHERE nickname='$nickname' AND ownerID='$ownerID'";
		$query = mysqli_query($connection, $sql);
		
		
		if (mysqli_num_rows($query) > 0) {
			echo "Error: A bike with this nickname is already registered under your account. Please use a different nickname.";
			return;
		}
		*/
		
		// here's the raw sql without php insertion: "UPDATE `bikesTable` SET `nickname`='', `manufacturer`='', `model`='', `type`='', `mpn`='', `colour`='', `wheelSize`='', `numberOfGears`='', `typeOfBreaks`='', `suspension`='', `gender`='', `ageGroup`='', `commonParkingPlace`='', `useCase`='', `otherDetails`='' WHERE `bikeID`='' AND `ownerID`='';
		$sql = "UPDATE `bikesTable` SET `investigationStatus`=1, `theftDate`='" . $theftDate . "', `theftTime`='" . $theftTime . "', `theftLocation`='" . $theftLocation . "', `theftLastKnownLocation`='" . $theftLastKnownLocation . "' WHERE `bikeID`='" . $bikeID . "' AND `ownerID`='" . $ownerID . "'";

		if (mysqli_query($connection, $sql)) {
			if ($debugMode) {
				echo "DEBUG: Successfully updated row in table in the database.";
			} else {
				echo "Your bike has been updated successfully.";
			}
		} else {
			if ($debugMode) {
				echo "ERROR: " . mysqli_error($connection);
			} else {
				echo "An error occurred trying to update your bike.";
			}
		}
		
		//sendEmail($email, $verificationcode);
		
		mysqli_close($connection);
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
		$body = 'Thank you for registering with Flogger. <br>';
		$body = $body.'Please click the link below to activate your account. <br>';
		$link = 'http://ct4009-17am.studentsites.glos.ac.uk/CT4009Sem2Week6/RegistrationPage/RegistrationDAO.php?'.
				'phpfunction=verifyUser&email='.$emailTo.
				'&verifyCode='.$verificationcode;
		$link = '<a href="'.$link.'">Click here</a>';
		$body = $body.$link;
		$message = '<html><body>';
		$message .= $body;
		$message .= '</body></html>';

		if (mail($emailTo, $subject, $message, $headers)){
			//Do Something
		} else {
			//Do Something
		}
	}
?>
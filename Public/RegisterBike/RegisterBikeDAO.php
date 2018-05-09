<?php

	if ($_POST['phpFunction'] == 'createBike') {
		createBike();
	} else if ($_GET['phpFunction'] == 'verifyUser') {
		verifyUser();
	} else {
		echo "Error: Unknown function call.";
	}

	function createBike() {
		$nickname = $_POST["nickname"];
		$manufacturer = $_POST["manufacturer"];
		$model = $_POST["model"];
		$type = $_POST["type"];
		$mpn = $_POST["mpn"];
		$colour = $_POST["colour"];
		$wheelSize = $_POST["wheelSize"];
		$numberOfGears = $_POST["numberOfGears"];
		$typeOfBreaks = $_POST["typeOfBreaks"];
		$suspension = $_POST["suspension"];
		$gender = $_POST["gender"];
		$ageGroup = $_POST["ageGroup"];
		$commonParkingPlace = $_POST["commonParkingPlace"];
		$useCase = $_POST["useCase"];
		$otherDetails = $_POST["otherDetails"];

		session_start();
		session_regenerate_id(true);
		$ownerID = $_SESSION["userID"];
		
		include "../../Global/config.php";
		
		$sql = "SELECT `bikeID` FROM `bikesTable` WHERE nickname='$nickname' AND ownerID='$ownerID'";
		$query = mysqli_query($connection, $sql);
		
		if (mysqli_num_rows($query) > 0) {
			echo "Error: A bike with this nickname is already registered under your account. Please use a different nickname.";
			return;
		}
				
		$sql = "INSERT INTO `bikesTable`".
			   " values ".
			   "(NULL, 0, '$nickname', '$manufacturer', '$model', '$type', '$mpn', '$colour', '$wheelSize',".
			   "'$numberOfGears', '$typeOfBreaks', '$suspension', '$gender', '$ageGroup',".
			   "'$commonParkingPlace', '$useCase', '$otherDetails', '$ownerID', '', '', '', '', '', '')";

		if (mysqli_query($connection, $sql)) {
			if ($debugMode) {
				echo "DEBUG: Successfully added new row to table in the database.";
			} else {
				echo "Your bike has been registered.";
			}
		} else {
			if ($debugMode) {
				echo "DEBUG: " . mysqli_error($connection);
			} else {
				echo "An error occurred trying to register your bike.";
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
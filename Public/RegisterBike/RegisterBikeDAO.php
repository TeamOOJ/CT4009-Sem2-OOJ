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
		
		
		$upload_folder = "../StolenBikeImages/";
		$imageID = 1;
		
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
				echo "ERROR: " . mysqli_error($connection);
			} else {
				echo "An error occurred trying to register your bike.";
			}
		}
		
		$insertedStolenBikeID = mysqli_insert_id($connection);
		$message = "";
		foreach($_FILES["images"]["name"] as $key => $file_name) {
			$tmp_name = $_FILES["images"]["tmp_name"][$key];
			if ($debugMode) {
				echo "tmp_name: " . $tmp_name . "\n";
			}
			switch( $_FILES["images"]['error'][$key] ) {
				case UPLOAD_ERR_OK:
					$message = false;
					break;
				case UPLOAD_ERR_INI_SIZE:
				case UPLOAD_ERR_FORM_SIZE:
					$message .= 'ERROR: file too large.';
					break;
				case UPLOAD_ERR_PARTIAL:
					$message .= 'ERROR: file upload was not completed.';
					break;
				case UPLOAD_ERR_NO_FILE:
					$message .= 'ERROR: empty file uploaded.';
					break;
				default:
					$message .= 'ERROR: internal error #'.$_FILES['newfile']['error'];
					break;
			}
			if ($message != "") { // if the error message variable is blank, continue with the file upload.
				echo $message . "\n";
			} else { // otherwise show a relevent error message and cancel the upload
					echo "error: " . $_FILES["images"]['error'][$key] . "\n";
				if ($debugMode) {
					echo "key: " . $key . "\n";
				}
				$ext = end((explode(".", $file_name)));
				$imageID = $insertedStolenBikeID . "_" . $key . "." . $ext;
				
				$sql = "INSERT INTO stolenBikeImagesTable (stolenBikeID, imageID) VALUES ('$insertedStolenBikeID', '$imageID')";
				if ($debugMode) {
					echo "SQL: " . $sql . "\n";
					echo "upload_folder: " . $upload_folder . $imageID . "\n";
				}
				move_uploaded_file($tmp_name, $upload_folder . $imageID);
				
				if (mysqli_query($connection, $sql)) {
					echo "success uploading images";
				} else {
					if ($debugMode) {
						echo "ERROR: " . mysqli_error($connection);
					} else {
						echo "An error occurred trying to register your bike.";
					}
				}
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
<?php
	require '../../Global/common.php';
	checkLogin(); // check if the user is logged in before showing the page. If the user isn't logged in, redirect to the login page instead.

	$bikeID = $_GET["bikeID"];
    
    session_start();
	$ownerID = $_SESSION["userID"];
	
	include '../../Global/config.php';
	$sql = "SELECT * FROM `bikesTable` WHERE bikeID='".$bikeID."' AND ownerID='".$ownerID."'";

	$res = mysqli_query($connection, $sql);
	$num_row = mysqli_num_rows($res);
	$row = mysqli_fetch_assoc($res);
	
	$data = $row;
	if ($num_row == 1) {
		//echo json_encode($row);
		/*if ($debugMode) { // print all the details retrieved from the bikesTable in the database if debugMode is true.
			echo "DEBUG: " . $row["bikeID"] . "<br>"; // the contents of bikeID from the database query selection
			echo "DEBUG: " . $row["nickname"] . "<br>";
			echo "DEBUG: " . $row["manufacturer"] . "<br>";
			echo "DEBUG: " . $row["model"] . "<br>";
			echo "DEBUG: " . $row["type"] . "<br>";
			echo "DEBUG: " . $row["mpn"] . "<br>";
			echo "DEBUG: " . $row["colour"] . "<br>";
			echo "DEBUG: " . $row["wheelSize"] . "<br>";
			echo "DEBUG: " . $row["numberOfGears"] . "<br>";
			echo "DEBUG: " . $row["typeOfBreaks"] . "<br>";
			echo "DEBUG: " . $row["suspension"] . "<br>";
			echo "DEBUG: " . $row["gender"] . "<br>";
			echo "DEBUG: " . $row["ageGroup"] . "<br>";
			echo "DEBUG: " . $row["commonParkingPlace"] . "<br>";
			echo "DEBUG: " . $row["useCase"] . "<br>";
			echo "DEBUG: " . $row["otherDetails"] . "<br>";
			echo "DEBUG: " . $row["ownerID"] . "<br>";
		}*/
		$data = $row;
	} else {
		echo "Error: Bike not found.";
		die();
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>CheckInvestigationStatus - Glos Constabulary</title>
		
		<script src="http://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

		<link href="../../Global/Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../../Global/glosPolice-theme.css" rel="stylesheet">

		<script src="../../Global/common.js" async></script>
	</head>
	<body>
		<main>
			<?php
				//echo '<p>You are updating the invesitgation status for bike nicknamed "' . $data["nickname"] . '" owned by userID ' . $data["ownerID"] . '</p>';
			?>
			<input type="text" name="phpFunction" value="updateStatus" readonly style="display: none;">
			<?php
				echo '<input type="number" name="ownerID" value="' . $data["ownerID"] . '" readonly style="display: none;">';
				if ($debugMode) {
					echo '<label>bikeID</label>';
					echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly>';
				} else {
					echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly style="display: none;">';
				}
			?>

			<h4>Current status</h4>
			<?php
				echo '<p>' . $data["investigationStatus"] . '</p>';

				echo '<br><h4>Notes</h4>';
				echo '<textarea readonly style="width: 90%;" rows="8" form="updateInvestigationStatusForm" name="victimVisibleNotes">' . $data["victimVisibleNotes"] . '</textarea><br><br>';
			?>
			<br><br><br><br>
		</main>
	</body>
</html>
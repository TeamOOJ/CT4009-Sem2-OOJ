<?php
	require '../../Global/common.php';
	checkLogin(); // check if the user is logged in before showing the page. If the user isn't logged in, redirect to the login page instead.

	$bikeID = $_GET["bikeID"];
    
    session_start();
	$ownerID = $_SESSION["userID"];
	
	include '../../Global/config.php';
	$sql = "SELECT * FROM `bikesTable` WHERE bikeID='".$bikeID."' AND ownerID='".$_SESSION["userID"]."'";

	$res = mysqli_query($connection, $sql);
	$num_row = mysqli_num_rows($res);
	$row = mysqli_fetch_assoc($res);
	
	$data = $row;
	if ($num_row == 1) {
		//echo json_encode($row);
		if ($debugMode) { // print all the details retrieved from the bikesTable in the database if debugMode is true.
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
		}
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
		<title>UpdateBike - Glos Constabulary</title>
		
		<script src="http://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

		<link href="../../Global/Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../../Global/glosPolice-theme.css" rel="stylesheet">

		<script src="../../Global/common.js" async></script>
	</head>
	<body>
		<header class="intro">
			<div data-grid="container">
				<nav>
					<img src="../../Global/Images/extra-small-long-logo4-dark.png" height="64px" style="vertical-align: middle;">
					<button class="f-primary large" onclick="location.href = '../Home/Home.php';">Home</button>
					<button class="f-primary large" onclick="location.href = '../BikesList/BikesList.php';">My bikes</button>
					<button class="f-primary large" onclick="location.href = '../../Global/YourProfile.php';">My profile</button>
					<button class="f-primary large" onclick="location.href = '../../Global/Logout/Logout.php';">Logout</button>
				</nav>
				<h1 class="heading-1">Update a bike</h1>
				<p>To update an existing bike, fill out the form below and click the "Update details" button.</p>
			</div>
		</header>
		<main data-grid="container">
			<form method="POST" action="UpdateBikeDAO.php">
				<input type="text" name="phpFunction" value="updateBike" readonly style="display: none;">
				<?php
					if ($debugMode) {
						echo '<label>bikeID</label>';
						echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly>';
					} else {
						echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly style="display: none;">';
					}
				?>

				<label>Nickname*</label>
				<?php
					echo '<input type="text" name="nickname" required value="' . $data["nickname"] . '">';
				?>

				<label>Manufacturer</label>
				<?php
					echo '<input type="text" name="manufacturer" value="' . $data["manufacturer"] . '">';
				?>
				
				<label>Model</label>
				<?php
					echo '<input type="text" name="model" value="' . $data["model"] . '">';
				?>
				
				<label>Type*</label>
				<?php
					echo '<input type="text" name="type" required value="' . $data["type"] . '">';
				?>
				
				<label>Manufacturer part number (MPN)</label>
				<?php
					echo '<input type="text" name="mpn" value="' . $data["mpn"] . '">';
				?>
				
				<label>Colour*</label>
				<?php
					echo '<input type="text" name="colour" required value="' . $data["colour"] . '">';
				?>
				
				<label>Wheel size</label>
				<?php
					echo '<input type="text" name="wheelSize" value="' . $data["wheelSize"] . '">';
				?>
				
				<label>Number of gears</label>
				<?php
					echo '<input type="number" name="numberOfGears" value="' . $data["numberOfGears"] . '">';
				?>
				
				<label>Type of breaks</label>
				<?php
					echo '<input type="text" name="typeOfBreaks" value="' . $data["typeOfBreaks"] . '">';
				?>
				
				<label>Suspension</label>
				<?php
					echo '<input type="text" name="suspension" value="' . $data["suspension"] . '">';
				?>
				
				<label>Gender</label>
				<?php
					echo '<input type="text" name="gender" value="' . $data["gender"] . '">';
				?>

				<label>Age group</label>
				<?php
					echo '<input type="text" name="ageGroup" value="' . $data["ageGroup"] . '">';
				?>

				<label>Where do you usually park your bike overnight?</label>
				<?php
					echo '<input type="text" name="commonParkingPlace" value="' . $data["commonParkingPlace"] . '">';
				?>

				<label>What do you usually use your bike for?</label>
				<?php
					echo '<input type="text" name="useCase" value="' . $data["useCase"] . '">';
				?>

				<label>Is there anything else you would like to tell us about your bike to help us identify it?</label>
				<br>
				<?php
					echo '<input type="text" name="otherDetails" value="' . $data["otherDetails"] . '">';
				?>

				<br><br>
				<input type="submit" value="Update details">
			</form>

			<br><br><br><br>
		</main>
	</body>
</html>
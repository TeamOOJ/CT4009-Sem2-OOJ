<?php
	require '../../Global/common.php';
	checkPoliceLogin(); // check if the user is logged in before showing the page. If the user isn't logged in, redirect to the login page instead.
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>eBayCompare - Glos Constabulary</title>
		
		<script src="http://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

		<link href="../../Global/Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../../Global/glosPolice-theme.css" rel="stylesheet">

		<link href="ebayCompare.css" rel="stylesheet">

		<script src="../../Global/common.js" async></script>
	</head>
	<body>
		<header class="intro">
			<div data-grid="container">
				<nav>
					<img src="../../Global/Images/extra-small-long-logo4-dark.png" height="64px" style="vertical-align: middle;">
					<button class="f-primary large" onclick="location.href = '../Home/Home.php';">Home</button>
					<button class="f-primary large" onclick="location.href = '../ViewStolenList/ViewStolenList.php';">View stolen bikes</button>
					<button class="f-primary large" onclick="location.href = '../../Global/YourProfile/YourProfile.php'">My profile</button>
					<?php
						if ($_SESSION["privledges"] >= 20) {
							echo '<button class="f-primary large" onclick="location.href = \'../../Police/EnrolPoliceOfficers/EnrolPoliceOfficers.php\';">Enrol police officers</button>';
						}
					?>
					<button class="f-primary large" onclick="location.href = '../../Global/Logout/Logout.php';">Logout</button>
				</nav>
				<h1 class="heading-1">Compare bike with eBay listing</h1>
				<p>(insert description here)</p>
			</div>
		</header>
		<main data-grid="container">
			<?php
				$bikeID = $_GET["bikeID"];

				session_start();
				$ownerID = $_GET["ownerID"];

				$askToPickABike = false;

				echo "DEBUG: " . $bikeID . "<br>";

				if ($bikeID == "") {
					// Ask to pick a bike before proceeding
					$askToPickABike = true;
				} else {
					include '../../Global/config.php';
					$sql = "SELECT * FROM `bikesTable` WHERE bikeID='".$bikeID."'";
				
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
						echo "<h3>Error: Bike not found.</h3>" . 
							 "<button class=\"f-primary\" onclick=\"location.href = 'eBayCompare.php';\">Retry</button>";
						die();
					}
				}
				if ($askToPickABike) {
					echo '<form method="GET" action="eBayCompare.php" id="updateInvestigationStatusForm">';
	
					echo '<h3>Pick the bike you wish to compare</h3>' .
							'<label>BikeID</label>' .
							'<input type="number" name="bikeID" required>';
	
					echo '<br><br><input type="submit" value="Choose bike">' .
							'</form>';
	
					echo '<div id="step2Container" class="hide">'; // hide the other questions about the bike until the user picks a bike
					die();
				} else {
					echo '<p>You are comparing the bike details on eBay for bike nicknamed "' . $data["nickname"] . '" owned by userID ' . $data["ownerID"] . '.</p>';

					if ($debugMode) {
						echo '<label>DEBUG: bikeID</label>';
						echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly>';
					} else {
						echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly style="display: none;">';
					}
						
					echo '<div id="step2Container" class="show" data-grid="col-12">'; // show the other questions about the bike as the user has picked a bike already
				}
			?>
				<section data-grid="col-6">
					<h3>Database</h3>
				<?php
					echo '<h4><a href="../UpdateInvestigationStatus/UpdateInvestigationStatus.php?bikeID=' . $data["bikeID"] . '&ownerID=' . $data["ownerID"] . '">' . $data["nickname"] . '</a></h4>';
				?>
					<ul>
					<?php
						echo '<li>Manufacturer: ' . $data["manufacturer"] . '</li>';
						echo '<li>Model: ' . $data["model"] . '</li>';
						echo '<li>Type: <span id="bikeType">' . $data["type"] . '</span></li>';
						echo '<li>Colour: ' . $data["colour"] . '</li>';
					?>
					</ul>
				</section>
				<section data-grid="col-6">
					<h3>eBay</h3>
					<div id="eBayResults">
				<?php
					echo '<h4>' . $data["nickname"] . '</h4>';
				?>
					<ul>
					<?php
						echo '<li>Manufacturer: ' . $data["manufacturer"] . '</li>';
						echo '<li>Model: ' . $data["model"] . '</li>';
						echo '<li>Type: ' . $data["type"] . '</li>';
						echo '<li>Colour: ' . $data["colour"] . '</li>';
					?>
					</ul>
					</div>
				</section>
			</div>

			<br><br><br><br>
		</main>
		<script src="eBayCompare.js" async></script>
	</body>
</html>
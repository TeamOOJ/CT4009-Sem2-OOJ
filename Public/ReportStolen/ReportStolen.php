<?php
	require '../../Global/common.php';
	checkLogin(); // check if the user is logged in before showing the page. If the user isn't logged in, redirect to the login page instead.
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>ReportStolen - Glos Constabulary</title>

		<link href="../../Global/Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../../Global/glosPolice-theme.css" rel="stylesheet">

		<link href="ReportStolen.css" rel="stylesheet">

        
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        
        <script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
        
		<script src="../../Global/common.js" async></script>
		<script src="ReportStolen.js" defer></script>
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
				<h1 class="heading-1">Report a theft</h1>
				<p>(insert description here)</p>
			</div>
		</header>
		<main data-grid="container">
		<?php
			$bikeID = $_GET["bikeID"];
			
			session_start();
			$ownerID = $_SESSION["userID"];

			$askToPickABike = false;

			if ($debugMode) {
				echo 'DEBUG: bikeID: ' . $bikeID;
			}

			if ($bikeID == "") {
				// Ask to pick a bike before proceeding
				$askToPickABike = true;
			} else {
				// Read bike details and check that it belongs to the current user
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
					echo "<h3>Sorry, we couldn't find a bike you own by that bikeID.</h3>".
						 "<button class=\"f-primary\" onclick=\"location.href = 'ReportStolen.php';\">Retry</button>";
					die();
				}
			}

			if ($askToPickABike) {
				echo '<form method="GET" action="ReportStolen.php">';

				echo '<h3>Pick the bike you wish to report</h3>' .
					 '<label>BikeID</label>' .
					 '<input type="number" name="bikeID" required>';

				echo '<br><br><input type="submit" value="Choose bike">' .
					 '</form>';

				echo '<div id="step2Container" class="hide">'; // hide the other questions about the bike until the user picks a bike
			} else {
				echo '<form method="POST" id="reportTheftForm" action="ReportStolenDAO.php">';
				if ($debugMode) {
					echo '<label>DEBUG: bikeID</label>';
					echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly>';
				} else {
					echo '<input type="number" name="bikeID" value="' . $data["bikeID"] . '" readonly style="display: none;">';
				}
				echo '<input type="text" name="phpFunction" value="reportBike" readonly style="display: none;">';
				
				echo '<div id="step2Container" class="show">'; // show the other questions about the bike as the user has picked a bike already
			}
		?>
				<h3>Date and time</h3>
				<p>Please check the boxes that apply regarding the date and time of the incident, then provide the relevant information.</p>
				<input type="checkbox" id="theftDateKnown" onchange="toggleTheftDate(this)">
				<label>I know what date the bike was stolen on.</label>

				<div id="theftDate">
					<label>When did you notice the bike was stolen?</label>
					<input type="date" class="theftDate" name="theftDate">
				</div>

				<br>
				<input type="checkbox" id="theftTimeKnown" onchange="toggleTheftTime(this)">
				<label>I know roughly what time the bike was stolen on.</label>

				<div id="theftTime">
					<label>If you know the approximate time of theft, enter it below in 24H format</label><br>
					<input type="time" class="theftTime" name="theftTime"><br>
				</div>

				<br>
				<h3>Location</h3>
				<p>Please check the boxes that apply regarding the location of your bicycle, then provide the relevant information.</p>

				<input type="checkbox" id="theftLastKnownLocationKnown" onchange="toggleTheftLastKnownLocation(this)">
				<label>I know where I last left my bike before it was stolen.</label>
				
				<div id="theftLastKnownLocation">
					<label>I last left it around...</label>
					<input type="text" class="theftLastKnownLocation" name="theftLastKnownLocation" id="latLngTxt">
                    <div id="mapInput" style="width: 650px; height: 300px;"></div> <br>
				</div>
            
            
            

				<!--<br>
				<input type="checkbox" id="theftLocationKnown">
				<label>I know where the suspect has left my bike.</label>

				<label>The suspect left it at...</label>
				<input type="text">-->

				<br>
				<input type="checkbox" id="theftLocationKnown" onchange="toggleTheftLocation(this)">
				<label>I know where it was stolen</label>

				<div id="theftLocation">
					<label>It was stolen at...</label>
					<input type="text" class="theftLocation" name="theftLocation" id="latLngTxt2">
                    <div id="mapInput2" style="width: 650px; height: 300px;"></div> <br>
				</div>

				<br>
				<h3>Further details</h3>
				<p>If you have any further details that could potentially aid the investigation, please include them below.</p>
				<textarea readonly style="width: 90%;" rows="8" form="reportTheftForm" name="theftVictimNotes"></textarea><br><br>

				<br><br>
				<input type="submit" value="Report theft">
			</form>
			</div>

			<br><br><br><br>
		</main>
	</body>
</html>
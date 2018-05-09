<?php
	require '../../Global/common.php';
	checkPoliceLogin();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>ViewStolenList - Glos Constabulary</title>
		
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

		<link href="../../Global/Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../../Global/glosPolice-theme.css" rel="stylesheet">
		
		<link href="ViewStolenList.css" rel="stylesheet">
		<script src="../../Global/common.js" async></script>
		<script src="ViewStolenList.js" async></script>
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
				<h1 class="heading-1">Stolen bikes list</h1>
				<p>(insert description here)</p>
			</div>
		</header>
		<main data-grid="container col-12">
			<aside data-grid="col-2">
				<h3>Filter</h3>

				<!-- https://stackoverflow.com/questions/5440657/how-to-hide-columns-in-html-table -->
				<input type="checkbox" checked id="countFilterCheckbox"></input>
				<label>Count</label>

				<input type="checkbox" checked id="manufacturerFilterCheckbox"></input>
				<label>Manufacturer</label>
				
				<input type="checkbox" checked id="modelFilterCheckbox"></input>
				<label>Model</label>
				
				<input type="checkbox" checked id="typeFilterCheckbox"></input>
				<label>Type</label>
				
				<input type="checkbox" checked id="mpnFilterCheckbox"></input>
				<label>MPN</label>
				
				<input type="checkbox" checked id="colourFilterCheckbox"></input>
				<label>Colour</label>
				
				<input type="checkbox" id="wheelSizeFilterCheckbox"></input>
				<label>Wheel size</label>
				
				<input type="checkbox" id="noOfGearsFilterCheckbox"></input>
				<label>No. of gears</label>
				
				<input type="checkbox" id="typeOfBreaksFilterCheckbox"></input>
				<label>Type of breaks</label>
				
				<input type="checkbox" id="suspensionFilterCheckbox"></input>
				<label>Suspension</label>
				
				<input type="checkbox" checked id="genderFilterCheckbox"></input>
				<label>Gender</label>
				
				<input type="checkbox" checked id="ageGroupFilterCheckbox"></input>
				<label>Age group</label>

				<input type="checkbox" id="commonParkingPlaceFilterCheckbox"></input>
				<label>Common parking place</label>
				
				<input type="checkbox" checked id="useCaseFilterCheckbox"></input>
				<label>Use case</label>
			</aside>
			<section data-grid="col-10">
				<!--<button class="f-primary" onclick="location.href = '../RegisterBike/RegisterBike.php'">Add a bike</button><br>-->
				<table id="stolenTable" class="hideWheelSize hideNoOfGears hideTypeOfBreaks hideSuspension hideCommonParkingPlace">
					<tr>
						<th>Count</th>
						<th>Status</th>
						<th>Nickname</th>
						<th>Owner</th>
						<th>Manufacturer</th>
						<th>Model</th>
						<th>Type</th>
						<th>MPN</th>
						<th>Colour</th>
						<th>Wheel size</th>
						<th># of gears</th>
						<th>Type of breaks</th>
						<th>Suspension</th>
						<th>Gender</th>
						<th>Age group</th>
						<th>Common parking place</th>
						<th>Use case</th>
						<th>More details</th>
						<th>Options</th>
					</tr>
					<?php
						include "../../Global/config.php";
						$sql = "SELECT * FROM `bikesTable` WHERE investigationStatus!='0'"; // invesitgation status 0 means no issues or resolved. higher numbers means an investigation is in progress.
		
						if ($debugMode) {
							echo "DEBUG: " . $sql . "<br>";
						}
						
						$res = mysqli_query($connection, $sql);
						$num_row = mysqli_num_rows($res);
						$row = mysqli_fetch_assoc($res);

						if ($debugMode) {
							echo "DEBUG: " . $num_row . "<br>";
						}
						
						$currentRow = 0;
						while ($currentRow < $num_row) {
							echo "<tr>";
							echo "	<td>#" . ($currentRow + 1) . "</td>";
							echo "	<td>" . $row["investigationStatus"] . "</td>";
							echo "	<td>" . $row["nickname"] . "</td>";
							
							include "../../Global/config.php";
							$userSql = "SELECT firstName, lastName FROM `usersTable` WHERE userID='" . $row["ownerID"] . "'";
							if ($debugMode) {
								echo $userSql . "<br>";
							}

							$userRes = mysqli_query($connection, $userSql);
							$num_userRow = mysqli_num_rows($userRes);
							$userRow = mysqli_fetch_assoc($userRes); // resolve the bike ownerID to the associated userID from the usersTable, and select the firstName and lastName columns for use
							if ($debugMode) {
								echo "num_userRow: " . $num_userRow . "<br>";
							}
							if ($num_userRow == 1) {
								echo "	<td>" . $userRow["firstName"] . " " . $userRow["lastName"] . "</td>";
							} else {
								echo "	<td> (Unknown) </td>";
							}

							echo "	<td>" . $row["manufacturer"] . "</td>";
							echo "	<td>" . $row["model"] . "</td>";
							echo "	<td>" . $row["type"] . "</td>";
							echo "	<td>" . $row["mpn"] . "</td>";
							echo "	<td>" . $row["colour"] . "</td>";
							echo "	<td>" . $row["wheelSize"] . "</td>";
							echo "	<td>" . $row["numberOfGears"] . "</td>";
							echo "	<td>" . $row["typeOfBreaks"] . "</td>";
							echo "	<td>" . $row["suspension"] . "</td>";
							echo "	<td>" . $row["gender"] . "</td>";
							echo "	<td>" . $row["ageGroup"] . "</td>";
							echo "	<td>" . $row["commonParkingPlace"] . "</td>";
							echo "	<td>" . $row["useCase"] . "</td>";
							echo "	<td>" . $row["otherDetails"] . "</td>";
							echo "	<td><a href='../UpdateInvestigationStatus/UpdateInvestigationStatus.php?bikeID=" . $row["bikeID"] . "&ownerID=" . $row["ownerID"] . "'>Update status</a></td>";
							echo "</tr>";
							$currentRow += 1;
						}
					?>
				</table>
			</section>
		</main>
		<article id="deleteBikePage" data-grid="container">
			<header class="typographic lightweight">
				<div>
					<h1>Confirm deletion</h1>
					<p>Please type in the nickname of the bike you're trying to delete in order to confirm deletion. This is to prevent accidentally deleting a bike.</p>
				</div>
			</header>
				
			<form method="POST" action="DeleteBike.php">
				<label>Confirm nickname of bike to delete*</label>
				<input type="text" name="bikeToDelete">
				<input type="submit" value="Confirm">
			</form>
			<button onclick="hideDeleteBikePage();">Cancel</button>
		</article>
	</body>
</html>
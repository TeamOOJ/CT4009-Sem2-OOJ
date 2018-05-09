<?php
	require '../common.php';
	checkLogin(); // check if the user is logged in before showing the page. If the user isn't logged in, redirect to the login page instead.

	include '../config.php';
	$sql = "SELECT * FROM `usersTable` WHERE userID='".$_SESSION["userID"]."'";

	$res = mysqli_query($connection, $sql);
	$num_row = mysqli_num_rows($res);
	$row = mysqli_fetch_assoc($res);
	
	//Save succesfully login email to session
	
	if ($num_row == 1) {
		//echo json_encode($row);
		if ($debugMode) { // print all the details retrieved from the usersTable in the database if debugMode is true.
			echo "DEBUG: " . $row["userID"] . "<br>"; // the contents of userID from the database query selection
			echo "DEBUG: " . $row["title"] . "<br>";
			echo "DEBUG: " . $row["firstName"] . "<br>";
			echo "DEBUG: " . $row["lastName"] . "<br>";
			echo "DEBUG: " . $row["dateOfBirth"] . "<br>";
			echo "DEBUG: " . $row["telephoneNumber"] . "<br>";
			echo "DEBUG: " . $row["email"] . "<br>";
			echo "DEBUG: " . $row["password"] . "<br>";
			echo "DEBUG: " . $row["verificationCode"] . "<br>";
			echo "DEBUG: " . $row["isVerified"] . "<br>";
			echo "DEBUG: " . $row["privledges"] . "<br>";
		}
		$data = $row;
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>YourProfile - Glos Constabulary</title>
		
		<script src="http://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

		<link href="../Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../glosPolice-theme.css" rel="stylesheet">

		<script src="../../Global/common.js" async></script>
	</head>
	<body>
		<header class="intro">
			<div data-grid="container">
				<nav>
					<img src="../Images/extra-small-long-logo4-dark.png" height="64px" style="vertical-align: middle;">
					<?php
						if ($data["privledges"] == 0) {
							echo '<button class="f-primary large" onclick="location.href = \'../../Public/Home/Home.php\';">Home</button>';
							echo '<button class="f-primary large" onclick="location.href = \'../../Public/BikesList/BikesList.php\';">My bikes</button>';
							echo '<button class="f-primary large">My profile</button>';
						} else if ($data["privledges"] > 0) {
							echo '<button class="f-primary large" onclick="location.href = \'../../Police/Home/Home.php\';">Home</button>';
							echo '<button class="f-primary large" onclick="location.href = \'../../Police/ViewStolenList/ViewStolenList.php\';">View stolen bikes</button>';
							echo '<button class="f-primary large">My profile</button>';
						}
						if ($data["privledges"] >= 20) {
							echo '<button class="f-primary large" onclick="location.href = \'../../Police/EnrolPoliceOfficers/EnrolPoliceOfficers.php\';">Enrol police officers</button>';
						}
					?>
					<button class="f-primary large" onclick="location.href = '../Logout/Logout.php';">Logout</button>
				</nav>
				<h1 class="heading-1">Your profile</h1>
				<p>Edit your details here. Note that you will need to verify your account again if you change your email address.</p>
			</div>
		</header>
		<main data-grid="container">
			<form method="POST" action="YourProfileDAO.php">
				<input type="text" name="phpFunction" value="updateUser" readonly style="display: none;">

				<label>Title (optional)</label>
				<?php
					echo '<input type="text" name="title" required value="' . $row["title"] . '">';
				?>

				<label>First name*</label>
				<?php
					echo '<input type="text" name="firstName" required value="' . $row["firstName"] . '">';
				?>
				
				<label>Last name*</label>
				<?php
					echo '<input type="text" name="lastName" required value="' . $row["lastName"] . '">';
				?>

				<label>Date of birth* (in format dd/mm/yyyy)</label><br>
				<?php
					echo '<input type="text" name="dateOfBirth" required value="' . $row["dateOfBirth"] . '">';
				?>

				<label>Telephone number (optional)</label>
				<?php
					echo '<input type="tel" name="telephoneNum" value="' . $row["telephoneNumber"] . '">';
				?>

				<label>Email*</label>
				<?php
					echo '<input type="email" name="email" required value="' . $row["email"] . '">';
				?>

				<label>To save changes, please re-enter your password*</label>
				<input type="password" name="pass" required>

				<br>
				<input type="submit" value="Change details">
			</form>
		</main>
	</body>
</html>
<?php
	session_start();
	session_regenerate_id(true);
	$userID = $_SESSION["userID"];
	if (isset($userID)) { // redirect straight to the homepage if already logged in
		if ($row["privledges"] > 0) { // go to the police homepage if the user privledges value is more than zero. Zero is for public users, anything above is for staff.
			echo '<meta http-equiv="refresh" content="1;url=../../Police/Home/Home.php">';
		} else {
			echo '<meta http-equiv="refresh" content="1;url=../../Public/Home/Home.php">';
		}
		die();
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Login - Glos Constabulary</title>

		<!-- <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Tell mobile browsers to scale this site to the actual device's width and scale factor, instead of treating it as a desktop site -->
		
		<script src="http://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

		<link href="../Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../../Global/glosPolice-theme.css" rel="stylesheet">
	</head>
	<body>
		<header class="intro">
			<div data-grid="container">
				<nav>
					<img src="../Images/extra-small-long-logo4-dark.png" height="64px" style="vertical-align: middle;">
					<button class="f-primary large">Home</button>
					<button class="f-primary large" onclick="location.href = '../../Public/RegisterPersonalDetails/RegisterPersonalDetails.html'">Register</button>
				</nav>
				<h1 class="heading-1">Login</h1>
				<p>To login, fill out the form below and click the "Login" button.</p>
			</div>
		</header>
		<main data-grid="container">
			<form method="POST" action="LoginDAO.php">
				<input type="text" name="phpFunction" value="Login" style="display: none;">

				<label>Email*</label>
				<input type="email" name="email" required>
				
				<label>Password*</label>
				<input type="password" name="pass" required>
				
				<br>
				<input type="submit" value="Login">
			</form>
		</main>
	</body>
</html>
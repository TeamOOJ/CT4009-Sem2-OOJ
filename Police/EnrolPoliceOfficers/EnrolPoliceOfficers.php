<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>EnrolPoliceOfficers - Glos Constabulary</title>
		
		<script src="http://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

		<link href="../../Global/Ozli-v1.5/general.css" rel="stylesheet">
		<link href="https://ozli.ga/Ozli-v1.4/grid.css" rel="stylesheet">
		<link href="../../Global/glosPolice-theme.css" rel="stylesheet">
	</head>
	<body>
		<header class="intro">
			<div data-grid="container">
				<nav>
					<img src="../../Global/Images/extra-small-long-logo4-dark.png" height="64px" style="vertical-align: middle;">
					<button class="f-primary large">Home</button>
					<button class="f-primary large" onclick="location.href = '../../Global/Login/Login.php'">Login</button>
				</nav>
				<h1 class="heading-1">Register police account</h1>
				<p>To register, fill out the form below and click the "Register officer" button.</p>
			</div>
		</header>
		<main data-grid="container">
			<form method="POST" action="EnrolPoliceOfficersDAO.php">
				<input type="text" name="phpFunction" value="createPoliceUser" style="display: none;">

				<!-- https://www.w3schools.com/htmL/html_form_attributes.asp -->
				
				<label>First name*</label>
				<input type="text" name="firstName" maxlength="128" required>
				
				<label>Last name*</label>
				<input type="text" name="lastName" maxlength="128" required>
				
				<label>Date of birth* (in format dd/mm/yyyy)</label><br>
				<input type="date" name="dateOfBirth" required>
				
				<label>Telephone number (optional)</label>
				<input type="tel" name="telephoneNum" maxlength="64">
				
				<label>Email*</label>
				<input type="email" name="email" required>
				
				<label>Password*</label>
				<input type="password" name="pass" minlength="1" required>
				
				<label>Confirm password*</label>
				<input type="password" name="confirmPass" minlength="1" required>
				
				<label class="switch">
					<span>Skip email verification?</span>
					<input class="switch" name="skipEmailVerificationBool" type="checkbox">
					<span class="on">Yes</span>
					<span class="off">No</span>
				</label>

				<br>
				<input type="submit" value="Register officer">
			</form>
		</main>
	</body>
</html>
<?php
	require '../../Global/common.php';
	checkLogin();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>RegisterBike - Glos Constabulary</title>
		
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

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
					<button class="f-primary large" onclick="location.href = '../../Global/YourProfile/YourProfile.php';">My profile</button>
					<button class="f-primary large" onclick="location.href = '../../Global/Logout/Logout.php';">Logout</button>
				</nav>
				<h1 class="heading-1">Register a bike</h1>
				<p>To register a bike, fill out the form below and click the "Register" button.</p>
			</div>
		</header>
		<main data-grid="container">
			<!-- https://html5tutorial.info/html5-datalist.php
			https://github.com/mfranzke/datalist-polyfill -->
			<form method="POST" enctype="multipart/form-data" id="registerBikeForm">
				<input type="text" name="phpFunction" value="createBike" readonly style="display: none;">

				<label>Nickname*</label>
				<input type="text" name="nickname" required>
				
				<label>Manufacturer</label>
				<input type="text" name="manufacturer">
				
				<label>Model</label>
				<input type="text" name="model">
				
				<label>Type*</label>
				<input type="text" name="type" list="bikeTypes" required>
				
				<label>Manufacturer part number (MPN)</label>
				<input type="text" name="mpn">
				
				<label>Colour*</label>
				<input type="text" name="colour" list="colours" required>
				
				<label>Wheel size</label>
				<input type="text" name="wheelSize">
				
				<label>Number of gears (leave as "-1" if unknown)</label>
				<input type="number" name="numberOfGears" value="-1">
				
				<label>Type of breaks</label>
				<input type="text" name="typeOfBreaks">
				
				<label>Suspension</label>
				<input type="text" name="suspension">
				
				<label>Gender</label>
				<input type="text" name="gender" list="bikeGenders">
				
				<label>Age group</label>
				<input type="text" name="ageGroup">
				
				<label>Please add some pictures of your bike*:</label><br>
				<input type="file" multiple name="images[]" id="bikeImages" required><br>
				
				<label>Where do you usually park your bike overnight?</label>
				<input type="text" name="commonParkingPlace">
				
				<label>What do you usually use your bike for?</label>
				<input type="text" name="useCase" list="useCases">
				
				<label>Is there anything else you would like to tell us about your bike to help us identify it?</label>
				<br>
				<input type="text" name="otherDetails">
				
				<br><br>
				<input type="submit" value="Register">
			</form>
			<button onclick="location.href = '../BikesList/BikesList.php';">Cancel</button>

			<br><br><br><br>
		</main>

		<!-- Suggest options based on what's being typed -->
		<datalist id="colours">
			<option value="Red"></option>
			<option value="Orange"></option>
			<option value="Yellow"></option>
			<option value="Green"></option>
			<option value="Cyan"></option>
			<option value="Blue"></option>
			<option value="Purple"></option>
			<option value="Pink"></option>
			<option value="Brown"></option>
			<option value="Black"></option>
			<option value="Grey"></option>
			<option value="White"></option>
			<option value="Bronze"></option>
			<option value="Silver"></option>
			<option value="Gold"></option>
			<option value="Unknown"></option>
			<option value="Other (please type it in this textbox)"></option>
		</datalist>
		<datalist id="bikeTypes">
			<option value="Electric bike"></option>
			<option value="Mountain bike"></option>
			<option value="BMX"></option>
			<option value="Road bike"></option>
			<option value="Folding bike"></option>
			<option value="Other (please type it in this textbox)"></option>
		</datalist>
		<datalist id="useCases">
			<option value="Commuting"></option>
			<option value="Leisure"></option>
			<option value="Competitions"></option>
			<option value="Other (please type it in this textbox)"></option>
		</datalist>
		<datalist id="bikeGenders">
			<option value="Unisex"></option>
			<option value="Female"></option>
			<option value="Male"></option>
			<option value="Other (please type it in this textbox)"></option>
		</datalist>
		
		<script src="RegisterBike.js"></script>
	</body>
</html>
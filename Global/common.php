<?php

if (isset($_POST['phpFunction'])) {
	if ($_POST['phpFunction'] == 'checkLogin') {
		checkLogin();
	} else if ($_POST['phpFunction'] == 'Logout') {
		logout();
	}
}


function logout() {
	$_SESSION = array(); // destroy all of the session variables
	if (ini_get("session.use_cookies")) {
		$params = session_get_cookie_params();
		setcookie(session_name(), '', time() - 42000,
			$params["path"], $params["domain"],
			$params["secure"], $params["httponly"]
		);
	}
	session_destroy();
	
	// https://stackoverflow.com/questions/768431/how-to-make-a-redirect-in-php
	// http://thedailywtf.com/articles/WellIntentioned-Destruction
	echo '<meta http-equiv="refresh" content="1;url=http://ct4009-17am.studentsites.glos.ac.uk/TeamOOO-Sem2/Global/Login/Login.php">';
	die();
}

function checkLogin() {
	session_start();
	session_regenerate_id(true);
	$userID = $_SESSION["userID"];
	if (!isset($userID)) {
		// If not logged in when trying to access the page, redirect to the login page and stop outputting any more data
		echo '<meta http-equiv="refresh" content="1;url=http://ct4009-17am.studentsites.glos.ac.uk/TeamOOO-Sem2/Global/Login/Login.php">';
		die();
	}
}

function checkPoliceLogin() {
	session_start();
	session_regenerate_id(true);
	$userID = $_SESSION["userID"];
	$privledges = $_SESSION["privledges"];
	if (!isset($userID) || $privledges < 1) {
		// If not logged in when trying to access the page, or if the user doesn't have sufficient privledges, redirect to the login page and stop outputting any more data
		echo "ERROR: You do not have permission to access this page. Redirecting to the login...";
		echo '<meta http-equiv="refresh" content="4;url=http://ct4009-17am.studentsites.glos.ac.uk/TeamOOO-Sem2/Global/Login/Login.php">';
		die();
	}
}

?>
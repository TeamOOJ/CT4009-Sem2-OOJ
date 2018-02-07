<?php
session_start();

// check if the user is attempting to login to another account rather than resume an existing session. If so, destroy the existing session to allow that.
//if (!isset($_POST['email'])) {
    // Start of third-party code from http://php.net/manual/en/function.session-destroy.php
    // If it's desired to kill the session, also delete the session cookie.
    // Note: This will destroy the session, and not just the session data!
/*    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    // end of third-party code
    session_destroy();
}*/

if (empty($_SESSION['currentUser'])) {
    if (isset($_POST['email'])) { $email = $_POST['email']; }
    if (isset($_POST['password'])) { $password = $_POST['password']; }

    $mysqli = new mysqli("localhost", "s1712027_oscar", "thechosenone", "s1712027_glosConstabulary");
    if ($mysqli->connect_errno) {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
        exit;
    } else {
        # echo "Successfully connected to MySQL.";
    }

    if (!$res = $mysqli->query("SELECT * FROM `usersTable` WHERE `email` = '$email' LIMIT 1")) { # read the database entry for the given email
        echo "Error: (" . $mysqli->errno . ") " . $mysqli->error;
        exit;
    } else {
        $row = $res->fetch_assoc();

        if (!$email == $row['email']) { # check if the email exists in the database, if not, throw an error.
            destroySession();
            echo "Error: Email not found.\n";
            exit;
        }

        # http://php.net/manual/en/function.password-verify.php
        if (password_verify($password, $row['password'])) { # check that the entered password matches the encrypted one on file
            $_SESSION['currentUser'] = $email; # it matches
            loggedIn();
        } else {
            # it doesn't match

            destroySession();
            echo "Invalid password.";
            echo "your pass: " . $password;
            echo "<br>";
            echo "actual pass: " . $row['password'];
            exit;
        }   
    }
} else {
    # Check that the email in the session matches one on file
    $mysqli = new mysqli("localhost", "oscarnardone@glos.ac.uk", "1HacoD&M%uni", "s1712027_glosConstabulary");
    if ($mysqli->connect_errno) {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    } else {
        echo "Successfully connected to MySQL.";
    }

    if ($res = $mysqli->query("SELECT * FROM `usersTable` WHERE `email` = '" . $_SESSION['currentUser'] . "' LIMIT 1")) {
        $row = $res->fetch_assoc();
        echo "Session: " . $_SESSION['currentUser'] . "\n";
        echo "email: " . $row['email'];
        if (!$_SESSION['currentUser'] == $row['email']) {
            destroySession();
            echo "Error: Invalid session ID.\n";
            exit;
        }
    } else {
        echo "Error: (" . $mysqli->errno . ") " . $mysqli->error;
        exit;
    }
    loggedIn();
}

function loggedIn() {
    session_regenerate_id(); # generate a new session straight after logging in for increased security (as the session cookie will change every login which reduces risk to session stealing)
    echo "Welcome back, " . $_SESSION['currentUser'] . "!";
    exit;
}

function destroySession() {
    // Start of third-party code from http://php.net/manual/en/function.session-destroy.php
    // If it's desired to kill the session, also delete the session cookie.
    // Note: This will destroy the session, and not just the session data!
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    // end of third-party code

    session_destroy();
}

?>
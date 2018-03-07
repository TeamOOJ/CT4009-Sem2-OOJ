<?php

########
# DONE #
########
# What: Grab form data and store in variables using PHP
# Who: Olivia Arnell, Josh Jackson
# GitHub issue: https://github.com/TeamOOJ/CT4009-Sem2-OOJ/issues/20

$firstName = $_POST["fName"];
$lastName = $_POST['lName'];
$dateOfBirth = $_POST['DOB'];
$telephoneNum = $_POST['telephoneNum'];
$email = $_POST['email'];
$pass = $_POST['password'];
$passConfirm = $_POST['passwordConfirm'];
$title = '';
$contactPreference = '';
$increaseContrast = 0;
$permissions = '';
$profilePic;




########
# DONE #
########
# What: Store grabbed form data into the users table in the MySQL database
# Who: Oscar Nardone
# GitHub issue: https://github.com/TeamOOJ/CT4009-Sem2-OOJ/issues/20

# http://php.net/manual/en/mysqli.quickstart.statements.php



// Start third-party code
// http://www.developphp.com/video/PHP/Random-String-Generator-PHP-Function-Programming-Tutorial
function randStrGen($len){
    $result = "";
    $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    $charArray = str_split($chars);
    for($i = 0; $i < $len; $i++){
	    $randItem = array_rand($charArray);
	    $result .= "".$charArray[$randItem];
    }
    return $result;
}

// Usage example
//$randstr = randStrGen(200);
//echo $randstr;
// End of third-party code

$generatedVerificationCode = randStrGen(16);



$dbAddress = "localhost";
$dbUsername = "s1712027_oscar";
$dbPassword = "thechosenone";
$dbName = "s1712027_glosConstabulary";

$mysqli = new mysqli($dbAddress, $dbUsername, $dbPassword, $dbName); # Create a new MySQLi object that connects to localhost with the login details and database name
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error; # if it fails to connect, show an error and give details
} else {
    echo "Successfully connected to MySQL."; # if it succeeds, say that it's connected fine
}

if (!$mysqli->query("INSERT INTO `usersTable` (`PrimaryKey`, `title`, `firstName`, `lastName`, `dateOfBirth`, `telephoneNum`, `email`, `pass`, `passConfirm`, `contactPreference`, `increaseContrast`, `permissions`, `isVerified`, `verificationCode`) VALUES (NULL, '$title', '$firstName', '$lastName', '$dateOfBirth', '$telephoneNum', '$email', '$pass', '$passConfirm', '$contactPreference', '$increaseContrast', '$permissions', '0', '$generatedVerificationCode')")) {
    echo "Error: (" . $mysqli->errno . ") " . $mysqli->error;
} else {
    echo "Successfully added new row to table usersTable.";
    
    
    
    sendEmail($email, $generatedVerificationCode);
}

#######
# WIP #
#######
# What: Send an email if successfully registered and verify their account
# Who: Olivia Arnell
# GitHub issue: https://github.com/TeamOOJ/CT4009-Sem2-OOJ/issues/20

function verifyUser() {
    $emailVerification = htmlspecialchars($_GET["emailAddr"]);
    $verificationCode = htmlspecialchars($_GET["verificationCode"]);
    
    if (!$mysqli->query("UPDATE `usersTable` SET `isVerified` = '1' WHERE `usersTable`.`email` = "$emailVerification"")) {
        echo "Error: (" . $mysqli->errno . ") " . $mysqli->error;
    } else {
        echo "Successfully added new row to table usersTable.";
    }
} 

function sendEmail($emailTo, $generatedVerificationCode) {
    $from="username@glos.ac.uk";
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    //Create email headers

    $headers .= 'From: '.$from. "\r\n".
        'Reply-To: '.$from."\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Compose the message of the email
    $body = 'Thank you for registering! <br>';
    $body = $body.'Please click the link below to activate your account. <br>';
    $link = 'http://ct4009-17am.studentsites.glos.ac.uk/TeamOOJ-Sem2/Public/RegisterPersonalDetails/RegisterPersonalDetails.php?'.
            'phpfunction=verifyUser&emailAddr='.$emailTo.
            '&verificationCode='.$generatedVerificationCode;
    $link = '<a href="'.$link.'">Click here</a>';
    $body = $body.$link;
    $message = '<html><body>';
    $message .= $body;
    $message .= '</body></html>';

    if (mail($emailTo, $subject, $message, $headers)){
        echo "Check your email for your code!";
        //Do Something
    } else {
        echo "An error has occured.";
        //Do Something
    }
}

?>

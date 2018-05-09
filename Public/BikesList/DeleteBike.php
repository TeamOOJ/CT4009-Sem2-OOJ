<?php
    include "../../Global/config.php";

    $nickname = $_POST["bikeToDelete"];
    
    session_start();
    $ownerID = $_SESSION["userID"];

    $sql = "SELECT bikeID, nickname, ownerID FROM `bikesTable` WHERE nickname='".$nickname."' AND ownerID='".$ownerID."'";
        
    if ($debugMode) {
        echo "DEBUG: " . $sql;
    }
        
    $res = mysqli_query($connection, $sql);
    $num_row = mysqli_num_rows($res);
    $row = mysqli_fetch_assoc($res);
    
    if ($num_row == 1) {
        //echo "DEBUG: " . json_encode($row);
        if ($debugMode) {
            echo "DEBUG: " . $row["ownerID"]; // the contents of ownerID from the database query selection
            echo "DEBUG: " . $row["bikeID"];
            echo "DEBUG: " . $row["nickname"];
        }
        $sql = "DELETE FROM `bikesTable` WHERE `bikesTable`.`bikeID`='" . $row["bikeID"] . "' AND `bikesTable`.`ownerID`='" . $ownerID . "'";
        if (mysqli_query($connection, $sql)) {
            echo "The bike \"" . $row["nickname"] . "\" has been deleted successfully.";
        } else {
            echo "An error occurred trying to delete the bike \"" . $row["nickname"] . "\"";
        }
    } else {
        echo "Error: Could not find a bike owned by you with that nickname. Check you've got the nickname right, and be aware that it's cAsE sEnSiTiVe.";
        die();
    }
?>
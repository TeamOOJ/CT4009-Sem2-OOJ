<?php

$mpn = $_POST['mpn'];
$brand = $_POST['brand'];
$model = $_POST['model'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$lat1 = $_POST['lat1'];
$lng1 = $_POST['lng1'];

include "../include/config.php";
$upload_folder = "../StolenBikeImages/";

$imageID = 1;

$sql = "INSERT INTO tblStolenBike (MPN, Brand, Model, Lat, Lng, Lat_2, Lng_2) VALUES ('$mpn', '$brand', '$model', '$lat', '$lng', '$lat1', '$lng1')";

if(!mysqli_query($connection, $sql)) {
	echo 'False';
}

$insertedStolenBikeid = mysqli_insert_id($connection);

foreach($_FILES["images"]["name"] as $key => $file_name) {
	$tmp_name = $_FILES["images"]["tmp_name"][$key];
	$ext = end((explode(".", $file_name)));
	$imageID = $insertedStolenBikeid . "_" . $key . "." . $ext;
	
	$sql = "INSERT INTO tblStolenBikeImages (StolenBikeID, ImageID) VALUES ('$insertedStolenBikeid', '$imageID')";
	
	if(!mysqli_query($connection, $sql)) {
	echo 'False';
	}
	
	move_uploaded_file($tmp_name, $upload_folder.$imageID);
}

echo 'True';

?>
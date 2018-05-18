<?php

if(isset($_POST['phpFunction'])) {
	if($_POST['phpFunction'] == 'getReportedBikeList') {
		getReportedBikeList();
	} elseif($_POST['phpFunction'] == 'getReportedBikeImages') {
		getReportedBikeImages();
	} 
}

//getReportedBikeList();

function getReportedBikeList() {
	include "../include/config.php";
	
	$sql = 	"SELECT * FROM tblStolenBike";
	
	$res = mysqli_query($connection, $sql);
	
	while( $row = mysqli_fetch_array( $res ) ) {
		$json[] = $row;
	}
	
	echo json_encode($json);
}


function getReportedBikeImages() {
	include "../include/config.php";
	
	$stolenbikeID = $_POST['stolenbikeID'];
	
	$sql = 	"SELECT * FROM tblStolenBikeImages where StolenBikeID='$stolenbikeID'";
	//echo $sql;
	
	$res = mysqli_query($connection, $sql);
	
	while( $row = mysqli_fetch_array( $res ) ) {
		$json[] = $row;
	}
	
	echo json_encode($json);
}

?>
var mapCenter = new google.maps.LatLng(51.8979988098144,-2.0838599205017);
var mapCenter2 = new google.maps.LatLng(51.8979988098144,-2.0838599205017);
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();
var marker;
var marker1;

function initialize() {
	var mapOptions = {
		zoom: 15,
		center: mapCenter
	};
	
	myMap = new google.maps.Map(document.getElementById("mapInput"), mapOptions);
    myMap2 = new google.maps.Map(document.getElementById("mapInput2"), mapOptions);
	
	marker = new google.maps.Marker({
		map: myMap,
		position: mapCenter,
		draggable: true
	});
    
    marker1 = new google.maps.Marker({
        map: myMap2,
        position: mapCenter2,
        draggable: true
    })
	
	google.maps.event.addListener(marker, 'dragend', markerDragged);
    google.maps.event.addListener(marker1, 'dragend', markerDragged1);
	
	function markerDragged() {
		var selectedPos = {'latLng': marker.getPosition()};
		geocoder.geocode(selectedPos, showAddressInInfoWindow);
	}
    
    function markerDragged1() {
		var selectedPos1 = {'latLng': marker1.getPosition()};
		geocoder.geocode(selectedPos1, showAddressInInfoWindow1);
	}
	
	function showAddressInInfoWindow(results) {
		if (results[0]) {
			infowindow.setContent(results[0].formatted_address);
			infowindow.open(myMap, marker);
		}
	}
    
    function showAddressInInfoWindow1(results) {
		if (results[0]) {
			infowindow.setContent(results[0].formatted_address);
            infowindow.open(myMap2, marker1);
		}
	}
}

google.maps.event.addDomListener(window, 'load', initialize);

$('#formReportStolen').on('submit', function(e) {
	var formData = new FormData(this);
	var lat = marker.getPosition().lat();
	var lng = marker.getPosition().lng();
	var lat1 = marker1.getPosition().lat();
	var lng1 = marker1.getPosition().lng();
	
	formData.append("lat", lat);
	formData.append("lng", lng);
	formData.append("lat1", lat1);
	formData.append("lng1", lng1);
	
	e.preventDefault();
	$.ajax({
		url: "ReportStolenBikeDAO.php",
		method: "POST",
		data: formData,
		contentType: false,
		cache: false,
		processData: false,
		success:function(echoedMsg) {
			if (echoedMsg == "True") {
				alert("Successfully reported.");
			} else {
			    alert(echoedMsg);
			}
		}
	});
});
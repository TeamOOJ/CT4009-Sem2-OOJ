var mapCenter = new google.maps.LatLng(51.8979988098144,-2.0838599205017);
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();
var myMap;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initialize(){
	var mapOptions = {
		zoom: 15,
		center: mapCenter
    };
		       
	myMap = new google.maps.Map(document.getElementById("mapInput"), mapOptions);
	
	getAllReportedBikeList();
}


google.maps.event.addDomListener(window, 'load', initialize);

/*$(document).ready(function(){
	
	
	getAllReportedBikeList();
});*/

function getAllReportedBikeList() {
	$.post("ShowAllReportedBikeDAO.php", "phpFunction=getReportedBikeList", function(data) {
			var html = '<table border="1">';
			html = html + '<tr> <th>Report No</th> <th>MPN</th> <th>Brand</th> <th>Model</th> <th>Action</th> </tr>';
			$.each(data, function(key, value){
				html = html + '<tr>';
				var stolenbikeID = value['StolenBikeID'];
				html = html + '<td> ' + stolenbikeID + ' </td>';
				html = html + '<td> ' + value['MPN'] + ' </td>';
				html = html + '<td> ' + value['Brand'] + ' </td>';
				html = html + '<td> ' + value['Model'] + ' </td>';
				
				
				html = html + '<td> <input type="button" id="' + stolenbikeID + '" value="Show Images" class="btnShowImages"> </input> </td>';
				
				html = html + '</tr>';
				
				var lat = value['Lat'];
				var lng = value['Lng'];
				
				var markerLatLng = new google.maps.LatLng(lat,lng);
		
				marker = new google.maps.Marker({
					label: stolenbikeID,
					map: myMap,
					position: markerLatLng
				});  
			});
			
			html = html + '</table>';
			$('#sectionBikeList').html(html);
			/*$("#txtStudentID").val(data['Student_No']);
			$("#txtLastname").val(data['Last_Name']);
			$("#txtFirstname").val(data['First_Name']);*/
			
	} , "json");	
}

$(document).on('click', '.btnShowImages', function(){ 
    var stolenbikeID = this.id;
	sessionStorage.setItem('StolenBikeID', stolenbikeID);
	
	window.open("./ShowBikeImages.html", "popupWindow", "width=400, height=400, scrollbars=yes");
});





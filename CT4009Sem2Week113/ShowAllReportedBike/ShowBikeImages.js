getBikeImages();

function getBikeImages() {
	var stolenbikeID = sessionStorage.getItem('StolenBikeID');
	var stolenbikeID;
	var html = '';
	$.post("ShowAllReportedBikeDAO.php", "phpFunction=getReportedBikeImages&stolenbikeID="+stolenbikeID, function(data) {
			
			var html = '<h2> Report No: ' + stolenbikeID + '</h2> <br>';
			$.each(data, function(key, value){
				var imageID = '../StolenBikeImages/' + value['ImageID'];
				html = html + '<img src="' + imageID + '" alt="' + imageID + '" height="400" width="400">'
				
				
			});
		
			$('#sectionBikeImages').html(html);
			
	}, "json");
}
$('#registerBikeForm').on('submit', function(e) {
	//alert("Got the message");
	var formData = new FormData(this);
	/*var lat = marker.getPosition().lat();
	var lng = marker.getPosition().lng();
	
	formData.append("lat", lat);
	formData.append("lng", lng);*/
	
	console.log(formData);
	
	e.preventDefault();
	$.ajax({
		url: "RegisterBikeDAO.php",
		method: "POST",
		data: formData,
		contentType: false,
		cache: false,
		processData: false,
		success:function(echoedMsg) {
			console.log(echoedMsg);
			if (echoedMsg == "True") {
				alert("Your bike has been successfully registered.");
				window.location = "../Home/Home.php"; // redirect to the homepage once registered
			}
		}
	});
});
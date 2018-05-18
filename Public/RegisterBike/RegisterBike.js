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
			if (!echoedMsg.toString().toLowerCase().includes("error")) { // https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
				alert("Your bike has been successfully registered.");
				//window.location = "../Home/Home.php"; // redirect to the homepage once registered
			} else {
				alert(echoedMsg);
			}
		},
		error:function(echoedMsg) {
			alert(echoedMsg); // https://stackoverflow.com/questions/1844370/jquery-handle-fallback-for-failed-ajax-request
		}
	});
});
//Password Validate
//The following lines of code checks whether
//or not user entered the same password in both
//paasword and confirm password textbox
var password = document.getElementById("txtPassword");
var confirmPassword = document.getElementById("txtConfirmPassword");

function validatePassword(){
  if(password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;


//Event handler for registration form submit 
$('#formUserRegistration').submit(function(event){
    // cancels the form submission
    formData = $('#formUserRegistration').serialize();
    //alert(formData);
	event.preventDefault();

	$.ajax({
		
		type: "POST",
		url: "RegistrationDAO.php",
		data: formData+"&phpfunction=createUser",
		success: function(echoedMsg){
			//alert (echoedMsg);
			if(echoedMsg=="True"){
				window.location="../LoginPage/Login.html";
			}else{
				$("#divMessage").html(echoedMsg);
			}
		},
		error: function(msg){
			console.log(msg);
		}
	});
});




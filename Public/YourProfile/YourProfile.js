 // General/shared code //
/////////////////////////

// Default values
var title = "";
var firstName = "";
var lastName = "";
var dateOfBirth = "";
var telephoneNum = "";
var email = "";
var id;
var contactPreference = "";
var increaseContrast = "false";
var password = "";
var permissions = "public";
var profilePic = null;
var profilePicStatus = "unavailable";

var sessionUsername = "";
var sessionUserID;

// User input elements
var userTitleInput = document.getElementsByName("userTitle")[0];
var userFirstNameInput = document.getElementsByName("firstName")[0];
var userLastNameInput = document.getElementsByName("lastName")[0];
var dateOfBirthInputDiv = document.getElementById("dateOfBirth");
var userTelephoneNumInput = document.getElementsByName("telephoneField")[0];
var userEmailInput = document.getElementsByName("emailField")[0];
var userContactPreferenceEmailRadio = document.getElementById("emailPreferredRadio");
var userContactPreferenceTelRadio = document.getElementById("telephonePreferredRadio");
var userIncreaseContrastToggleSwitch = document.getElementById("increaseContrastToggle");

 // Database initialisers //
///////////////////////////

// Initialise the IndexedDB database and callback to the doUserProfileUpdate() function
function updateUserProfile() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        doUserProfileUpdate();
    });
}

  // doUserProfileUpdate() //
 ///////////////////////////
// This function updates the user's entry in initialised IndexedDB database with the any changes made on the page

function doUserProfileUpdate() {
    selectAll(function(results) {
        var result = false;
        if (!results || !results.length) {

        } else {
            var len = results.length, i;

            // The username and userID is stored into the sessionStorage when the user logs in. Grab this data from the sessionStorage.
            sessionUsername = sessionStorage.getItem('username');
            sessionUserID = sessionStorage.getItem('userID');

            // For each entry in the database...
            for (i = 0; i < len; i++) {

                // Check that the entry's username and userID matches the session's username and userID
                if (results[i].email.toString() === sessionUsername.toString() && results[i].id.toString() === sessionUserID.toString()) {
                    
                    // Grab the input values in the page
                    title = userTitleInput.value;
                    firstName = userFirstNameInput.value;
                    lastName = userLastNameInput.value;
                    dateOfBirth = getAndProcessDateOfBirth();
                    telephoneNum = userTelephoneNumInput.value;
                    email = userEmailInput.value;
                    profilePic = profilePicFileUploadInput.files[0];

                    increaseContrast = userIncreaseContrastToggleSwitch.getAttribute("aria-checked").toString();                    
                    
                    if (userContactPreferenceEmailRadio.checked == true) {
                        contactPreference = "email";
                    } else if (userContactPreferenceTelRadio.checked == true) {
                        contactPreference = "telephone";
                    }
                    
                    // Prepare the data for storing in an entry in the database
                    var data = {
                        'id': parseInt(sessionUserID),
                        'title': title,
                        'firstName': firstName,
                        'lastName': lastName,
                        'dateOfBirth': dateOfBirth,
                        'telephoneNum': telephoneNum,
                        'email': email,
                        'contactPreference': contactPreference,
                        'increaseContrast': increaseContrast,
                        'password': password,
                        'permissions': permissions,
                        'profilePic': profilePic
                    }
                    
                    // Save the prepared data into the database entry
                    updateOne(data, function(lastID) {
                        console.log("Debug: lastID: " + lastID);
                        return false;
                    });
                    
                    // Update the entry in the results[i] variable array so that the page doesn't have to be refreshed to reflect changes
                    results[i].title = title;
                    results[i].firstName = firstName;
                    results[i].lastName = lastName;
                    results[i].dateOfBirth = dateOfBirth;
                    results[i].telephoneNum = telephoneNum;
                    results[i].email = email;
                    results[i].contactPreference = contactPreference;
                    results[i].increaseContrast = increaseContrast;
                    results[i].password = password;
                    results[i].permissions = permissions;
                    results[i].id = id;
                    results[i].profilePic = profilePic;

                    // Update the session storage entry incase the email is changed in the database
                    sessionStorage.setItem('username', results[i].email);
                    
                    // Finally, set the result to true to announce that the user profile has been updated successfully.
                    result = true;
                } else {
                    // Otherwise, continue onto the next entry in the database
                    continue;
                }

                if (result == true) {
                    alert("User profile updated successfully.");
                } else {
                    alert("Error: Failed to update your user profile.");
                }
            }
        }
    })
}

// Get the user profile loaded onto the page once this script has finished downloading
getUserProfile(true);

 // changePassword() //
//////////////////////
var currentPasswordInput = document.getElementById("currentPasswordInputbox");
var newPasswordInput = document.getElementById("newPasswordInputbox");
var newPasswordConfirmInput = document.getElementById("newPasswordConfirmationInputbox");

function changePassword() {
    console.log("Debug: Password: " + password);
    console.log("Debug: Inputted current password: " + currentPasswordInput.value.toString());
    console.log("Debug: Inputted new password:     " + newPasswordInput.value.toString());
    console.log("Debug: Inputted new password confirm: " + newPasswordConfirmInput.value.toString());

    // First check that the user has inputted the same current password as the actual current password before continuing
    if (currentPasswordInput.value.toString() === password) {
        // The passwords match

        // Now check that the new password and new password again inputs match
        if (newPasswordInput.value.toString() === newPasswordConfirmInput.value.toString()) {
            // Both the new password fields match

            // Set the password to the new password and save the changes to the user's entry in the database
            password = newPasswordInput.value.toString();
            updateUserProfile();
            setTimeout(function(){window.location.href = "../Login/Login.html";}, 1000);
        } else {
            // The two new password fields are different
            alert("Error: The new password and new password confirmation fields don't match.");
        }

    } else {
        // The passwords don't match
        alert("Error: The current password you inputted doesn't seem to match what's on file. Double check and try again.");
    }
}

 // uploadProfilePic() //
////////////////////////
var profilePicFileUploadInput = document.getElementById("profilePictureFileUpload");
var profilePicPreviewElement = document.getElementsByClassName("profilePicturePreview")[0].children[0];

profilePicFileUploadInput.addEventListener("change", function() {
    console.log("changed");
    var reader = new FileReader();
    reader.onloadend = function() {
        profilePicPreviewElement.src = reader.result;        
    }

    if (profilePicFileUploadInput.files[0]) {
		reader.readAsDataURL(profilePicFileUploadInput.files[0]); 
    } else {
		profilePicPreviewElement.src = null;
    }
});

function uploadProfilePic() {
    // 4 megabytes in bytes is 4194304 according to Bing
    if (profilePicFileUploadInput.files[0].size > 4194304) {
        // If the selected picture is more than 4MiB, don't upload it
        alert("Error: The image you selected is too large. Please upload an image that is 4MiB or smaller and try again.");
    } else {

        // Check if the selected picture is either a jpeg or a png based on its detected mime type
        if (profilePicFileUploadInput.files[0].type === "image/jpeg" || profilePicFileUploadInput.files[0].type === "image/png") {
            // If it is a .jpg, .jpeg or .png then upload it
            profilePic = profilePicFileUploadInput.files[0];
            updateUserProfile();
            //window.location.reload();
        } else {
            // otherwise, show an error
            alert("Error: Sorry, but we only accept JPEG and PNG images. Please upload a .jpg, .jpeg or .png image and try again.");
        }
    }
}

function removeProfilePic() {
    profilePic = null;
    updateUserProfile();
}
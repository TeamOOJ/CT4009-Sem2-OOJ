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
var profilePic;

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

// Initialise the IndexedDB database and callback to the doUserProfileRetrieval() function
function getUserProfile() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        doUserProfileRetrieval();
    });
}

// Initialise the IndexedDB database and callback to the doUserProfileUpdate() function
function updateUserProfile() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        doUserProfileUpdate();
    });
}

  // doUserProfileRetrieval() //
 //////////////////////////////
// This function grabs the user's data from the initialised IndexedDB database and optionally inserts it into the page

// By default, it will not insert into the page. You need to parse "true" in the args for it to insert the data into appropriate elements automatically
function doUserProfileRetrieval(doAutoInsert) {
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
                // Log the entry data to the console to help debug any issues that arise
                console.log(results[i]);
                console.log("Debug: Email from database: " + results[i].email);
                console.log("Debug: Email from session:  " + sessionUsername); // Grabbed from the sessionStorage earlier
                console.log("Debug: ID from database:    " + results[i].id);
                console.log("Debug: ID from session:     " + sessionUserID); // Also grabbed from the sessionStorage earlier

                // Check that the entry's username and userID matches the session's username and userID
                if (results[i].email.toString() === sessionUsername.toString() && results[i].id.toString() === sessionUserID.toString()) {
                    // If it does match, read all the data from the entry individually,
                    // inserting the data appropriately for each of the user inputs on the page if desired
                    if (doAutoInsert) {
                        userTitleInput.value = results[i].title;
                        userFirstNameInput.value = results[i].firstName;
                        userLastNameInput.value = results[i].lastName;
                        processAndSetDateOfBirth(results[i].dateOfBirth.split("/")[0], results[i].dateOfBirth.split("/")[1], results[i].dateOfBirth.split("/")[2]);
                        userTelephoneNumInput.value = results[i].telephoneNum;
                        userEmailInput.value = results[i].email;

                        profilePicURL = window.URL.createObjectURL(results[i].profilePic);
                        profilePicPreviewElement.src = profilePicURL;

                        if (results[i].contactPreference == "email") {
                            // The contact preference is email. Check the email radio option
                            userContactPreferenceEmailRadio.click();
                        } else if (results[i].contactPreference == "telephone") {
                            // The contact preference is telephone. Check the telephone radio option
                            userContactPreferenceTelRadio.click();
                        }

                        if (results[i].increaseContrast.toString() == "true") {
                            // Click the toggle switch to make it true, but wait half a second incase the element is still loading so that it successfully toggles the switch
                            setTimeout(function() {userIncreaseContrastToggleSwitch.click();}, 500);
                        }

                        for (count = 0; count < document.getElementsByClassName("personaProfilePic").length; count++) {
                            document.getElementsByClassName("personaProfilePic")[count].src = profilePicURL;
                        }
                        for (count = 0; count < document.getElementsByClassName("personaFullName").length; count++) {
                            document.getElementsByClassName("personaFullName")[count].innerText = results[i].firstName + " " + results[i].lastName;
                        }
                        for (count = 0; count < document.getElementsByClassName("personaEmail").length; count++) {
                            document.getElementsByClassName("personaEmail")[count].innerText = results[i].email;
                        }
                    } else {
                        profilePicURL = window.URL.createObjectURL(results[i].profilePic);
                    }

                    // And also into the variables for inputs including those that should not be seen on the page but are needed to update the entry later on if desired
                    title = results[i].title;
                    firstName = results[i].firstName;
                    lastName = results[i].lastName;
                    dateOfBirth = results[i].dateOfBirth;
                    telephoneNum = results[i].telephoneNum;
                    email = results[i].email;
                    contactPreference = results[i].contactPreference;
                    increaseContrast = results[i].increaseContrast;
                    password = results[i].password;
                    permissions = results[i].permissions;
                    id = results[i].id;
                    profilePic = results[i].profilePic;

                    // Finally, set the result to true to announce that the user profile has been retrieved successfully.
                    result = true;

                } else {
                    // Otherwise, continue onto the next entry in the database
                    continue;
                }

                if (result == true) {
                    console.log("Debug: Retrieved your user profile successfully.");
                } else {
                    alert("Error: Failed to retrieve your user profile.");
                }

            }
        }
    })
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

 // Date picker processor //
///////////////////////////
function getAndProcessDateOfBirth() {
    var dateOfBirthDay = dateOfBirthInputDiv.children[0].attributes[3].value;
    var dateOfBirthMonthRaw = dateOfBirthInputDiv.children[1].attributes[3].value;
    var dateOfBirthMonth;
    var dateOfBirthYear = dateOfBirthInputDiv.children[2].attributes[3].value;
    if (dateOfBirthMonthRaw == "January") {
        dateOfBirthMonth = 01;
    } else if (dateOfBirthMonthRaw == "February") {
        dateOfBirthMonth = 02;
    } else if (dateOfBirthMonthRaw == "March") {
        dateOfBirthMonth = 03;
    } else if (dateOfBirthMonthRaw == "April") {
        dateOfBirthMonth = 04;
    } else if (dateOfBirthMonthRaw == "May") {
        dateOfBirthMonth = 05;
    } else if (dateOfBirthMonthRaw == "June") {
        dateOfBirthMonth = 06;
    } else if (dateOfBirthMonthRaw == "July") {
        dateOfBirthMonth = 07;
    } else if (dateOfBirthMonthRaw == "August") {
        dateOfBirthMonth = 08;
    } else if (dateOfBirthMonthRaw == "September") {
        dateOfBirthMonth = 09;
    } else if (dateOfBirthMonthRaw == "October") {
        dateOfBirthMonth = 10;
    } else if (dateOfBirthMonthRaw == "November") {
        dateOfBirthMonth = 11;
    } else if (dateOfBirthMonthRaw == "December") {
        dateOfBirthMonth = 12;
    } else {
        dateOfBirthMonth = 00;
    }
    var dateOfBirth = dateOfBirthDay + "/" + dateOfBirthMonth + "/" + dateOfBirthYear;

    return dateOfBirth.toString();
}

function processAndSetDateOfBirth(day, monthNum, year) {
    var dateOfBirthDayInput = dateOfBirthInputDiv.children[0];
    var dateOfBirthMonthInputRaw = dateOfBirthInputDiv.children[1];
    var dateOfBirthYearInput = dateOfBirthInputDiv.children[2];

    dateOfBirthDayInput.attributes[2].value = "Day: " + day.toString();
    dateOfBirthDayInput.attributes[3].value = day;
    dateOfBirthDayInput.innerText = day;

    dateOfBirthYearInput.attributes[2].value = "Year: " + year.toString();
    dateOfBirthYearInput.attributes[3].value = year;
    dateOfBirthYearInput.innerText = year;

    if (monthNum == 01) {
        month = "Janurary";
    } else if (monthNum == 02) {
        month = "Feburary";
    } else if (monthNum == 03) {
        month = "March";
    } else if (monthNum == 04) {
        month = "April";
    } else if (monthNum == 05) {
        month = "May";
    } else if (monthNum == 06) {
        month = "June";
    } else if (monthNum == 07) {
        month = "July";
    } else if (monthNum == 08) {
        month = "August";
    } else if (monthNum == 09) {
        month = "September";
    } else if (monthNum == 10) {
        month = "October";
    } else if (monthNum == 11) {
        month = "November";
    } else if (monthNum == 12) {
        month = "December";
    }

    dateOfBirthMonthInputRaw.attributes[2].value = "Month: " + month;
    dateOfBirthMonthInputRaw.attributes[3].value = month;
    dateOfBirthMonthInputRaw.innerText = month;
}

// Get the user profile loaded onto the page once this script has finished downloading
getUserProfile();






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
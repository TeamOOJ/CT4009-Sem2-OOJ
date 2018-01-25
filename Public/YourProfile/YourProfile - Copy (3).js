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

var sessionUsername = "";
var sessionUserID;

// User input elements
var userTitleInput = document.getElementsByName("userTitle")[0];
var userFirstNameInput = document.getElementsByName("firstName")[0];
var userLastNameInput = document.getElementsByName("lastName")[0];
// Todo: DoB
var userTelephoneNumInput = document.getElementsByName("telephoneField")[0];
var userEmailInput = document.getElementsByName("emailField")[0];
var userContactPreferenceEmailRadio = document.getElementById("emailPreferredRadio");
var userContactPreferenceTelRadio = document.getElementById("telPreferredRadio");
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
// This function grabs the user's data from the initialised IndexedDB database and inserts it into the page

function doUserProfileRetrieval() {
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
                    // inserting the data appropriately for each of the user inputs on the page
                    userTitleInput.value = results[i].title;
                    userFirstNameInput.value = results[i].firstName;
                    userLastNameInput.value = results[i].lastName;
                    // Todo: DoB
                    userTelephoneNumInput.value = results[i].telephoneNum;
                    userEmailInput.value = results[i].email;

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
                    // Todo: DoB
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
                        'permissions': permissions
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
getUserProfile();
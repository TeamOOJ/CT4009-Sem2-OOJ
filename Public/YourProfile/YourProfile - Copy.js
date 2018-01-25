/* Old code that uses cookies for highContrast toggle setting */
function toggleHighContrastMode(clickedToggle) {
    if (clickedToggle.getAttribute("aria-checked") == "false") {
        setCookie("highContrastMode", "y", 365);
        console.log("Debug: highContrastMode has been turned on.");
    } else {
        setCookie("highContrastMode", "n", 365);
        console.log("Debug: highContrastMode has been turned off.");
    }
    checkHighContrastMode();
}

var increaseContrastToggle = document.getElementById("increaseContrastToggle");
var increaseContrastToggleStatusLabel = document.getElementById("increaseContrastToggleStatusLabel");
var highContrastModeStatus = getCookie("highContrastMode");
if (highContrastModeStatus == "y") {
    increaseContrastToggle.setAttribute("aria-checked", "true");
    increaseContrastToggleStatusLabel.innerText = "On";
}

var password = "";
var permissions = "public";

function updateUserProfile() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        doUserProfileUpdate();
    });
}

function getUserProfile() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        doUserProfileRetrieval();
    });
}

/* More old code that I wrote based on reading entries and attempting to change an existing entry... didn't work :( */
function doUserProfileUpdate() {
    selectAll(function(results) {
        var result = false;
        if (!results || !results.length) {

        } else {
                var dateOfBirthDay = document.getElementsByClassName("c-date-time-picker")[0].children[0].attributes[3].value;
                var dateOfBirthMonthRaw = document.getElementsByClassName("c-date-time-picker")[0].children[1].attributes[3].value;
                var dateOfBirthMonth;
                var dateOfBirthYear = document.getElementsByClassName("c-date-time-picker")[0].children[2].attributes[3].value;
                
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

            var len = results.length, i;

            var username = sessionStorage.getItem('username');
            var userID = sessionStorage.getItem('userID');

            var userTitle = document.getElementsByName("userTitle")[0].value;
            var userFirstName = document.getElementsByName("firstName")[0].value;
            var userLastName = document.getElementsByName("lastName")[0].value;
            var dateOfBirth = dateOfBirth.toString();
            var telephoneNum = document.getElementsByName("telephoneField")[0].value;
            var email = document.getElementsByName("emailField")[0].value;
            var emailPreferredRadio = document.getElementById("emailPreferredRadio").checked;
            var contactPreference = "";
            if (emailPreferredRadio == true) {
                contactPreference = "email";
            } else {
                contactPreference = "telephone";
            }
            var increaseContrast = document.getElementById("increaseContrastToggle").getAttribute("aria-checked").toString();          
            selectOne(userID, function(record) {
                if (!record) {
                    console.log("Error: Unable to retrieve entry for userID \"" + userID + "\"");
                } else {
                    permissions = record.permissions;
                }
            })

            for (i = 0; i < len; i++) {
                if(results[i].email.toString() === username.toString() && results[i].id.toString() === userID.toString()) {
                    var data = {
                        'id': parseInt(sessionStorage.getItem("userID")),
                        'firstName': userFirstName,
                        'lastName': userLastName,
                        'dateOfBirth': dateOfBirth,
                        'telephoneNum': telephoneNum,
                        'email': email,
                        'contactPreference': contactPreference,
                        'password': password,
                        'permissions': permissions,
                        'increaseContrast': increaseContrast
                    }
                    
                    // Save the new values into the database entry
                    updateOne(data, function(lastID) {
                        console.log("lastID: " + lastID);
                        return false;
                    });
                    results[i].title = userTitle;
                    results[i].firstName = userFirstName;
                    results[i].lastName = userLastName;
                    results[i].telephoneNum = telephoneNum;
                    results[i].email = email;
                    results[i].increaseContrast = increaseContrast;
                    console.log("IncreaseContrast: " + increaseContrast);
                    result = true;
                }
            }

            if (result == true) {
                alert("User profile updated successfully.");
            } else {
                alert("Error: Failed to update your user profile.");
            }
        }
    })
}

function doUserProfileRetrieval() {
    selectAll(function(results) {
        var result = false;
        if (!results || !results.length) {

        } else {
            var len = results.length, i;

            var username = sessionStorage.getItem('username');
            var userID = sessionStorage.getItem('userID');

            for (i = 0; i < len; i++) {
                console.log(results[i]);
                console.log("Debug: Email from database: " + results[i].email);
                console.log("Debug: Email from session:  " + username);                
                console.log("Debug: ID from database:    " + results[i].id);
                console.log("Debug: ID from session:     " + userID);                
                if (results[i].id.toString() === userID.toString() && results[i].email.toString() === username.toString()) {
                    // Get the elements that the data is going to be put in
                    var userTitleInput = document.getElementsByName("userTitle")[0];
                    var userFirstNameInput = document.getElementsByName("firstName")[0];
                    var userLastNameInput = document.getElementsByName("lastName")[0];
                    // Todo: date of birth
                    var telephoneNumInput = document.getElementsByName("telephoneField")[0];
                    var emailInput = document.getElementsByName("emailField")[0];
                    // Todo: contact preference
                    var contactPreference = "";
                    if (emailPreferredRadio == true) {
                        contactPreference = "email";
                    } else {
                        contactPreference = "telephone";
                    }

                    var increaseContrastToggleSwitch = document.getElementById("increaseContrastToggle");                  

                    // Get the values from the database entry
                    userTitleInput.value = results[i].title;
                    userFirstNameInput.value = results[i].firstName;
                    userLastNameInput.value = results[i].lastName;
                    telephoneNumInput.value = results[i].telephoneNum;
                    emailInput.value = results[i].email;

                    // Contact preference
                    if (results[i].contactPreference == "email") {
                        
                    }

                    password = results[i].password;

                    if (results[i].increaseContrast.toString() == "true") {
                        increaseContrastToggleSwitch.click();
                    }
                    console.log("IncreaseContrast: " + results[i].increaseContrast.toString());
                    result = true;
                }
            }

            if (result == true) {
                console.log("Debug: Retrieved your user profile successfully.")
            } else {
                alert("Error: Failed to retrieve your user profile.");
            }
        }
    })
}
getUserProfile();
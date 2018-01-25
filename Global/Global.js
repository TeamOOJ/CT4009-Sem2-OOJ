 // Libraries by Oscar Nardone //
////////////////////////////////

// Embedded stylesheet overrides library
// This allows you to programmatically change styles on the page with advanced CSS selectors and overrides that are not possible with the standard DOM style library
var sheet = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
})();

 // Session storage and IndexedDB accessors //
/////////////////////////////////////////////
// Default values in session storage and IndexedDB
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

// The username and userID is stored into the sessionStorage when the user logs in. Grab this data from the sessionStorage.
sessionUsername = sessionStorage.getItem('username');
sessionUserID = sessionStorage.getItem('userID');

 // Database initialisers //
///////////////////////////

// Generic database initialiser
// Initialise the IndexedDB database and callback to the specified function
function initialiseTheDatabase(callback) {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        callback()
    });
}

// Initialise the IndexedDB database and callback to the doUserProfileRetrieval() function
function getUserProfile(doAutoInsert) {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        doUserProfileRetrieval(doAutoInsert);
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

                        try { userTitleInput.value = results[i].title; } catch(err) { console.log("Error: " + err.message); }
                        try { userFirstNameInput.value = results[i].firstName; } catch(err) { console.log("Error: " + err.message); }
                        try {  userLastNameInput.value = results[i].lastName; } catch(err) { console.log("Error: " + err.message); }
                        try { processAndSetDateOfBirth(results[i].dateOfBirth.split("/")[0], results[i].dateOfBirth.split("/")[1], results[i].dateOfBirth.split("/")[2]); } catch(err) { console.log("Error: " + err.message); }
                        try { userTelephoneNumInput.value = results[i].telephoneNum; } catch(err) { console.log("Error: " + err.message); }
                        try { userEmailInput.value = results[i].email; } catch(err) { console.log("Error: " + err.message); }

                        if (results[i].profilePic != null) {
                            profilePicURL = window.URL.createObjectURL(results[i].profilePic);
                            try { profilePicPreviewElement.src = profilePicURL; } catch(err) { console.log("Error: " + err.message); }
                            profilePicStatus = "available";
                        } else {
                            profilePicStatus = "unavailable";
                        }

                        if (results[i].contactPreference == "email") {
                            // The contact preference is email. Try to check the email radio option
                            try { userContactPreferenceEmailRadio.click(); } catch(err) { console.log("Error: " + err.message); }
                        } else if (results[i].contactPreference == "telephone") {
                            // The contact preference is telephone. Try to check the telephone radio option
                            try { userContactPreferenceTelRadio.click(); } catch(err) { console.log("Error: " + err.message); }
                        }

                        if (results[i].increaseContrast.toString() == "true") {
                            // Click the toggle switch to make it true, but wait half a second incase the element is still loading so that it successfully toggles the switch
                            setTimeout(function() {try { userIncreaseContrastToggleSwitch.click(); } catch(err) { console.log("Error: " + err.message); }}, 500);
                        }

                    } else {
                        if (results[i].profilePic != null) {
                            profilePicURL = window.URL.createObjectURL(results[i].profilePic);
                            profilePicStatus = "available";
                        } else {
                            profilePicStatus = "unavailable";
                        }
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

                    // Enable high contrast mode if turned on by the user
                    if (increaseContrast.toString() == "true") {
                        setHighContrastMode(true);
                    } else {
                        setHighContrastMode(false);
                    }

                    // Poplate any persona elements with the user's data and profile picture if available
                    if (profilePicStatus == "available") {
                        populatePersonas(profilePicStatus, profilePicURL, firstName, lastName, email);
                    } else {
                        populatePersonas(profilePicStatus, "na", firstName, lastName, email);
                    }

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

function populatePersonas(profilePicStatus, profilePicURL, firstName, lastName, email) {
    console.log("populatePersonas");
    console.log("profilePicStatus: '" + profilePicStatus + "'");
    console.log("profilePicURL: '" + profilePicURL + "'");
    console.log("firstName: '" + firstName + "'");
    console.log("lastName: '" + lastName + "'");
    console.log("email: '" + email + "'");
    if (profilePicStatus != "unavailable") {
        for (count = 0; count < document.getElementsByClassName("personaProfilePic").length; count++) {
            document.getElementsByClassName("personaProfilePic")[count].src = profilePicURL;
        }
    }
    for (count = 0; count < document.getElementsByClassName("personaFullName").length; count++) {
        document.getElementsByClassName("personaFullName")[count].innerText = firstName + " " + lastName;
    }
    for (count = 0; count < document.getElementsByClassName("personaEmail").length; count++) {
        document.getElementsByClassName("personaEmail")[count].innerText = email;
    }
}

// Date picker processor //
///////////////////////////
function getAndProcessDateOfBirth() {
    var dateOfBirthDay = dateOfBirthInputDiv.children[0].attributes[3].value;
    var dateOfBirthMonthRaw = dateOfBirthInputDiv.children[1].attributes[3].value;
    var dateOfBirthMonth;
    var dateOfBirthYear = dateOfBirthInputDiv.children[2].attributes[3].value;
    if (dateOfBirthMonthRaw == "January") {
        dateOfBirthMonth = 91;
    } else if (dateOfBirthMonthRaw == "February") {
        dateOfBirthMonth = 92;
    } else if (dateOfBirthMonthRaw == "March") {
        dateOfBirthMonth = 93;
    } else if (dateOfBirthMonthRaw == "April") {
        dateOfBirthMonth = 94;
    } else if (dateOfBirthMonthRaw == "May") {
        dateOfBirthMonth = 95;
    } else if (dateOfBirthMonthRaw == "June") {
        dateOfBirthMonth = 96;
    } else if (dateOfBirthMonthRaw == "July") {
        dateOfBirthMonth = 97;
    } else if (dateOfBirthMonthRaw == "August") {
        dateOfBirthMonth = 98;
    } else if (dateOfBirthMonthRaw == "September") {
        dateOfBirthMonth = 99;
    } else if (dateOfBirthMonthRaw == "October") {
        dateOfBirthMonth = 10;
    } else if (dateOfBirthMonthRaw == "November") {
        dateOfBirthMonth = 11;
    } else if (dateOfBirthMonthRaw == "December") {
        dateOfBirthMonth = 12;
    } else {
        dateOfBirthMonth = 00;
    }
    console.log("dateOfBirthMonth: '" + dateOfBirthMonth + "'");
    console.log("dateOfBirthMonthRaw: '" + dateOfBirthMonthRaw + "'");
    var dateOfBirth = dateOfBirthDay + "/" + dateOfBirthMonth + "/" + dateOfBirthYear;

    console.log("dateOfBirth.toString(): '" + dateOfBirth.toString() + "'");

    return dateOfBirth.toString();
}

function processAndSetDateOfBirth(day, monthNum, year) {
    var dateOfBirthDayInput = dateOfBirthInputDiv.children[0];
    var dateOfBirthMonthInputRaw = dateOfBirthInputDiv.children[1];
    var dateOfBirthYearInput = dateOfBirthInputDiv.children[2];
    var month;

    dateOfBirthDayInput.attributes[2].value = "Day: " + day.toString();
    dateOfBirthDayInput.attributes[3].value = day;
    dateOfBirthDayInput.innerText = day;

    dateOfBirthYearInput.attributes[2].value = "Year: " + year.toString();
    dateOfBirthYearInput.attributes[3].value = year;
    dateOfBirthYearInput.innerText = year;

    if (monthNum == 91) {
        month = "January";
    } else if (monthNum == 92) {
        month = "February";
    } else if (monthNum == 93) {
        month = "March";
    } else if (monthNum == 94) {
        month = "April";
    } else if (monthNum == 95) {
        month = "May";
    } else if (monthNum == 96) {
        month = "June";
    } else if (monthNum == 97) {
        month = "July";
    } else if (monthNum == 98) {
        month = "August";
    } else if (monthNum == 99) {
        month = "September";
    } else if (monthNum == 10) {
        month = "October";
    } else if (monthNum == 11) {
        month = "November";
    } else if (monthNum == 12) {
        month = "December";
    }

    console.log("monthNum: "+ monthNum);
    console.log("month: " + month);

    dateOfBirthMonthInputRaw.attributes[2].value = "Month: " + month;
    dateOfBirthMonthInputRaw.attributes[3].value = month;
    dateOfBirthMonthInputRaw.innerText = month;
}

 // High contrast mode //
////////////////////////
// Calling setHighContrastMode with true will set the current page's styles to high contrast mode. Calling it with false will undo any changes it previously made to the contrast (if any).
function setHighContrastMode(highContrastMode) {
    if (highContrastMode === true) {
        var menuBarProfileFullName = document.getElementById("menuBarProfile").children[1].children[0] // force the colour to white of the menu bar profile full name (on top right of the page, beside your mugshot)
        var menuBarProfileEmail = document.getElementById("menuBarProfile").children[1].children[1] // do the same for the email subtext under your full name

        menuBarProfileFullName.style.color = "#FFF";
        menuBarProfileEmail.style.color = "#FFF";

        menuBarProfileFullName.style.textShadow = "#000 0px 0px 24px";
        menuBarProfileEmail.style.textShadow = "#000 0px 0px 24px";

        /* No longer using this as the text shadow above provides a similar contrast increase without impacting the context of the design
        menuBarProfileFullName.style.backgroundColor = "#000"; // change the background to black to futher increase contrast
        menuBarProfileEmail.style.backgroundColor = "#000";

        menuBarProfileFullName.style.padding = "4px"; // add some padding for better legibility against the background
        menuBarProfileEmail.style.padding = "4px";
        */

        var typographicIntroTitle = document.getElementsByTagName("main")[0].getElementsByClassName("m-typographic-intro f-background-accent f-transparent f-brief")[0].children[0].children[0].children[0];
        var typographicIntroDescription = document.getElementsByTagName("main")[0].getElementsByClassName("m-typographic-intro f-background-accent f-transparent f-brief")[0].children[0].children[0].children[1];
        
        typographicIntroTitle.style.textShadow = "#000 0px 0px 64px";
        typographicIntroDescription.style.textShadow = "#000 0px 0px 32px";

        console.log("Debug: highContrastMode is currently set to true.");    
    } else if (highContrastMode === false) {
        console.log("Debug: highContrastMode is currently set to false.");
        try { sheet.deleteRule(0); } catch(e) { console.log("Error: " + e); } // politely ask the embedded stylesheet js library to delete the styles inside it
        try { sheet.deleteRule(0); } catch(e) { console.log("Error: " + e); }
        try { sheet.deleteRule(0); } catch(e) { console.log("Error: " + e); }
        try { sheet.deleteRule(0); } catch(e) { console.log("Error: " + e); }
        document.getElementsByTagName("style")[0].parentElement.removeChild(document.getElementsByTagName("style")[0]); // attempt to remove the js embedded stylesheet override if still present
    }

    sheet.insertRule(".c-button {text-shadow: #fff 0px 0px 16px;}", 0);
    sheet.insertRule("nav.c-in-page-navigation > ul li > a {color: #000;}", 1);
    sheet.insertRule("nav.c-in-page-navigation > ul li > a.f-active, nav.c-in-page-navigation > ul li > a:active {font-weight: bold;}", 2);
    sheet.insertRule(".c-heading, .c-subheading, .c-heading-1, .c-heading-2, .c-heading-3, .c-heading-4, .c-heading-5, .c-subheading-1, .c-subheading-2, .c-subheading-3, .c-subheading-4, .c-subheading-5 {font-weight: bold;}", 3);
}
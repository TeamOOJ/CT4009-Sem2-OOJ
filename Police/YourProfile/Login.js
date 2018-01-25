function loginUser() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        doLogin();
    });
}

function doLogin() {
    selectAll(function(results) {
        var result = false;
        if (!results || !results.length) {

        } else {
            var len = results.length, i;

            var username = document.getElementById("usernameInputbox").value;
            var password = document.getElementById("passwordInputbox").value;
            var userPerms = "";
            sessionStorage.clear();

            for (i = 0; i < len; i++) {
                if(username === results[i].email && password === results[i].password) {
                    sessionStorage.setItem('username', results[i].email);
                    sessionStorage.setItem('userID', results[i].id);
                    sessionStorage.setItem('userPerms', results[i].permissions);
                    userPerms = results[i].permissions;
                    result = true;
                }
            }

            if (result == true) {
                if (userPerms == "public") {
                    window.location.href = "../Home/Home.html";
                } else if (userPerms == "police") {
                    window.location.href = "../../Police/Home/Home.html";
                } else if (userPerms == "adminPolice") {
                    window.location.href = "../../AdminPolice/Home/Home.html";
                } else {
                    console.log("Error: Unknown user permission: \"" + userPerms + "\"");
                }
            } else {
                alert("Invalid email or password.");
            }
        }
    })
}






/* The following function saves data in an indexedDB database, learnt during S1WK5 e-learning */
var firstNameField = document.getElementsByName("firstNameField")[0];
var lastNameField = document.getElementsByName("lastNameField")[0];

// Date of birth fields are done on runtime (when the user clicks the "Next"/"Register" button) due to the text to number translation needed.

var telephoneField = document.getElementsByName("telephoneField")[0];
var emailField = document.getElementsByName("emailField")[0];
var passwordField = document.getElementsByName("passwordField")[0];

function saveRegistrationData(userType) {
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

    var title = "";
    var firstName = firstNameField.value;
    var lastName = lastNameField.value;
    var dateOfBirth = dateOfBirth.toString();
    var telephoneNum = telephoneField.value;
    var email = emailField.value;
    var contactPreference = "";
    var password = passwordField.value;
    var permissions = userType.toString();

    var data = {
        'title': title,
        'firstName': firstName,
        'lastName': lastName,
        'dateOfBirth': dateOfBirth,
        'telephoneNum': telephoneNum,
        'email': email,
        'contactPreference': contactPreference,
        'password': password,
        'permissions': permissions
    };

    insertOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}
function registerPublicUser() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('UsersObjectStore');
    startDB(function() {
        saveRegistrationData("public");
        window.location.href = "../Login/Login.html";
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
    var increaseContrast = "false";
    var profilePic;

    var data = {
        'title': title,
        'firstName': firstName,
        'lastName': lastName,
        'dateOfBirth': dateOfBirth,
        'telephoneNum': telephoneNum,
        'email': email,
        'contactPreference': contactPreference,
        'password': password,
        'permissions': permissions,
        'increaseContrast': increaseContrast,
        'profilePic': profilePic
    };

    insertOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}
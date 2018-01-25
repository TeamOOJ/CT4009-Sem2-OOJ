var addBikePageElement = document.getElementById("addBikePage");
var viewBikePageElement = document.getElementById("viewBikePage");

var bikeNickname = "";
var knownBikesArray = [];

// The username and userID is stored into the sessionStorage when the user logs in. Grab this data from the sessionStorage.
sessionUsername = sessionStorage.getItem('username');
sessionUserID = sessionStorage.getItem('userID');
var bikeOwnerID = sessionUserID;

function showAddBikePage(clickedElement) {
    if (!addBikePageElement.classList.contains("show")) { // if the addBikePage isn't currently visible (this is an optimisation as there's only ever one add bike button but can be many existing bikes in the list)
        addBikePageElement.classList.add("show"); // show it and make sure the changeBikePage is hidden too so it doesn't overlap or cause confusion to the user
        viewBikePageElement.classList.remove("show");

        while (document.getElementsByClassName("selected")[0] != undefined) {
            document.getElementsByClassName("selected")[0].classList.remove("selected");
        }

        clickedElement.classList.add("selected");
    }
}
var debugClickedElement
function showViewBikePage(clickedElement) {
    // Determine what bike has been selected by the bike nickname inside the clickedElement
    //clickedBikeNickname = clickedElement.children[1].children[0].innerText;
    console.log(clickedElement); // for debugging
    debugClickedElement = clickedElement; // for debugging

    debugClickedElement.classList.add("selected");

    viewBikePageElement.classList.add("show"); // show it and make sure the addBikePage is hidden too so it doesn't overlap or cause confusion to the user
    addBikePageElement.classList.remove("show");

    // https://stackoverflow.com/questions/4256339/javascript-how-to-loop-through-all-dom-elements-on-a-page
    while (document.getElementsByClassName("selected")[0] != undefined) {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }
    //document.querySelectorAll(".containsSelectedItem").classList.remove("containsSelectedItem");

    // Now load the details of that bike before opening the changeBikePage
    //viewBikeInDB(clickedBikeNickname);
}

var addBikeNicknameTextbox = document.getElementById("addBikeNicknameTextbox");
var addBikeManufacturerTextbox = document.getElementById("addBikeManufacturerTextbox");
var addBikeManufacturerDropdownButton = document.getElementById("addBikeManufacturerDropdownButton");
var addBikeModelTextbox = document.getElementById("addBikeModelTextbox");
var addBikeTypeTextbox = document.getElementById("addBikeTypeTextbox");
var addBikeTypeDropdownButton = document.getElementById("addBikeTypeDropdownButton");
var addBikeMPNTextbox = document.getElementById("addBikeMPNTextbox");
var addBikeColourTextbox = document.getElementById("addBikeColourTextbox");
var addBikeColourDropdownButton = document.getElementById("addBikeColourDropdownButton");
var addBikeWheelSizeTextbox = document.getElementById("addBikeWheelSizeTextbox");
var addBikeGearCountTextbox = document.getElementById("addBikeGearCountTextbox");
var addBikeBrakeTypeTextbox = document.getElementById("addBikeBrakeTypeTextbox");
var addBikeSuspensionTextbox = document.getElementById("addBikeSuspensionTextbox");
var addBikeGenderTextbox = document.getElementById("addBikeGenderTextbox");
var addBikeAgeGroupTextbox = document.getElementById("addBikeAgeGroupTextbox");
var addBikeCommonHomeTextbox = document.getElementById("addBikeCommonHomeTextbox");
var addBikeUseCaseTextbox = document.getElementById("addBikeUseCaseTextbox");
var addBikeUseCaseDropdownButton = document.getElementById("addBikeUseCaseDropdownButton");
var addBikeAdditionalDetailsTextarea = document.getElementById("addBikeAdditionalDetailsTextarea");
var addBikeSaveDraftButton = document.getElementById("addBikeSaveDraftButton");
var addBikeSubmitChangesButton = document.getElementById("addBikeSubmitChangesButton");

var editBikeNicknameTextbox = document.getElementById("editBikeNicknameTextbox");
var editBikeManufacturerTextbox = document.getElementById("editBikeManufacturerTextbox");
var editBikeManufacturerDropdownButton = document.getElementById("editBikeManufacturerDropdownButton");
var editBikeModelTextbox = document.getElementById("editBikeModelTextbox");
var editBikeTypeTextbox = document.getElementById("editBikeTypeTextbox");
var editBikeTypeDropdownButton = document.getElementById("editBikeTypeDropdownButton");
var editBikeMPNTextbox = document.getElementById("editBikeMPNTextbox");
var editBikeColourTextbox = document.getElementById("editBikeColourTextbox");
var editBikeColourDropdownButton = document.getElementById("editBikeColourDropdownButton");
var editBikeWheelSizeTextbox = document.getElementById("editBikeWheelSizeTextbox");
var editBikeGearCountTextbox = document.getElementById("editBikeGearCountTextbox");
var editBikeBrakeTypeTextbox = document.getElementById("editBikeBrakeTypeTextbox");
var editBikeSuspensionTextbox = document.getElementById("editBikeSuspensionTextbox");
var editBikeGenderTextbox = document.getElementById("editBikeGenderTextbox");
var editBikeAgeGroupTextbox = document.getElementById("editBikeAgeGroupTextbox");
var editBikeCommonHomeTextbox = document.getElementById("editBikeCommonHomeTextbox");
var editBikeUseCaseTextbox = document.getElementById("editBikeUseCaseTextbox");
var editBikeUseCaseDropdownButton = document.getElementById("editBikeUseCaseDropdownButton");
var editBikeAdditionalDetailsTextarea = document.getElementById("editBikeAdditionalDetailsTextarea");
var editBikeSaveDraftButton = document.getElementById("editBikeSaveDraftButton");
var editBikeSubmitChangesButton = document.getElementById("editBikeSubmitChangesButton");
function toggleBikeEditMode(clickedToggle) {
    /*if (clickedToggle.attributes[3].value() == false) {*/
    if (clickedToggle.getAttribute("aria-checked") == "false") {
        editBikeNicknameTextbox.disabled = false;
        editBikeManufacturerTextbox.disabled = false;
        editBikeManufacturerDropdownButton.disabled = false;
        editBikeModelTextbox.disabled = false;
        editBikeTypeTextbox.disabled = false;
        editBikeTypeDropdownButton.disabled = false;
        editBikeMPNTextbox.disabled = false;
        editBikeColourTextbox.disabled = false;
        editBikeColourDropdownButton.disabled = false;
        editBikeWheelSizeTextbox.disabled = false;
        editBikeGearCountTextbox.disabled = false;
        editBikeBrakeTypeTextbox.disabled = false;
        editBikeSuspensionTextbox.disabled = false;
        editBikeGenderTextbox.disabled = false;
        editBikeAgeGroupTextbox.disabled = false;
        editBikeCommonHomeTextbox.disabled = false;
        editBikeUseCaseTextbox.disabled = false;
        editBikeUseCaseDropdownButton.disabled = false;
        editBikeAdditionalDetailsTextarea.disabled = false;
        editBikeSaveDraftButton.style.display = "inline-block";
        editBikeSubmitChangesButton.style.display = "inline-block";

        document.getElementById("viewBikePage").children[0].innerText = "Editing your bike";
    } else {
        editBikeNicknameTextbox.disabled = true;
        editBikeManufacturerTextbox.disabled = true;
        editBikeManufacturerDropdownButton.disabled = true;
        editBikeModelTextbox.disabled = true;
        editBikeTypeTextbox.disabled = true;
        editBikeTypeDropdownButton.disabled = true;
        editBikeMPNTextbox.disabled = true;
        editBikeColourTextbox.disabled = true;
        editBikeColourDropdownButton.disabled = true;
        editBikeWheelSizeTextbox.disabled = true;
        editBikeGearCountTextbox.disabled = true;
        editBikeBrakeTypeTextbox.disabled = true;
        editBikeSuspensionTextbox.disabled = true;
        editBikeGenderTextbox.disabled = true;
        editBikeAgeGroupTextbox.disabled = true;
        editBikeCommonHomeTextbox.disabled = true;
        editBikeUseCaseTextbox.disabled = true;
        editBikeUseCaseDropdownButton.disabled = true;
        editBikeAdditionalDetailsTextarea.disabled = true;
        editBikeSaveDraftButton.style.display = "none";
        editBikeSubmitChangesButton.style.display = "none";

        document.getElementById("viewBikePage").children[0].innerText = "Your bike";        
    }
}

function saveDraft(newOrExistingBike) {
    if (newOrExistingBike == "newBike") {
        newBikeNickname = document.getElementById("newBikeNickname");

        newBikeNickname.value = "DRAFT-" + newBikeNickname.value();
    } else {
        editBikeNickname = document.getElementById("editBikeNickname");

        editBikeNickname.value = "DRAFT-" + editBikeNickname.value();
    }
}






function addBikeToDB() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('BikesObjectStore');
    startDB(function() {
        addBikeData();
        alert("Bike registered");
    })
}

/* The following function saves data in an indexedDB database, learnt during S1WK5 e-learning */
function addBikeData() {
    var bikeNickname = addBikeNicknameTextbox.value.toString();
    var bikeManufacturer = addBikeManufacturerTextbox.value.toString();
    var bikeModel = addBikeModelTextbox.value.toString();
    var bikeType = addBikeTypeTextbox.value.toString();
    var bikeMPN = addBikeMPNTextbox.value.toString();
    var bikeColour = addBikeColourTextbox.value.toString();
    var bikeWheelSize = addBikeWheelSizeTextbox.value.toString();
    var bikeGearCount = addBikeGearCountTextbox.value.toString();
    var bikeBrakeType = addBikeBrakeTypeTextbox.value.toString();
    var bikeSuspension = addBikeSuspensionTextbox.value.toString();
    var bikeGender = addBikeGenderTextbox.value.toString();
    var bikeAgeGroup = addBikeAgeGroupTextbox.value.toString();
    var bikeCommonHome = addBikeCommonHomeTextbox.value.toString();
    var bikeUseCase = addBikeUseCaseTextbox.value.toString();
    var bikeAdditionalDetails = addBikeAdditionalDetailsTextarea.value.toString();

    var data = {
        'owner': sessionUserID,
        'nickname': bikeNickname,
        'manufacturer': bikeManufacturer,
        'model': bikeModel,
        'type': bikeType,
        'mpn': bikeMPN,
        'colour': bikeColour,
        'wheelsize': bikeWheelSize,
        'gearCount': bikeGearCount,
        'braketype': bikeBrakeType,
        'suspension': bikeSuspension,
        'gender': bikeGender,
        'agegroup': bikeAgeGroup,
        'commonhome': bikeCommonHome,
        'usecase': bikeUseCase,
        'additionaldetails': bikeAdditionalDetails
    };

    insertOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}

function viewBikeInDB() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('BikesObjectStore');
    startDB(function() {
        viewBikeData();
    })
}

function viewBikeData() {
    selectAll(function(results) {
        var result = false;
        if (!results || !results.length) {

        } else {
            var len = results.length, i;

            for (i = 0; i < len; i++) {
                if(sessionUserID === results[i].owner) {
                    bikeOwnerID = results[i].owner;
                    editBikeNicknameTextbox.value = results[i].nickname;
                    editBikeManufacturerTextbox.value = results[i].manufacturer;
                    editBikeModelTextbox.value = results[i].model;
                    editBikeTypeTextbox.value = results[i].type;
                    editBikeMPNTextbox.value = results[i].mpn;
                    editBikeColourTextbox.value = results[i].colour;
                    editBikeWheelSizeTextbox.value = results[i].wheelsize;
                    editBikeGearCountTextbox.value = results[i].gearCount;
                    editBikeBrakeTypeTextbox.value = results[i].braketype;
                    editBikeSuspensionTextbox.value = results[i].suspension;
                    editBikeGenderTextbox.value = results[i].gender;
                    editBikeAgeGroupTextbox.value = results[i].agegroup;
                    editBikeCommonHomeTextbox.value = results[i].commonhome;
                    editBikeUseCaseTextbox.value = results[i].usecase;
                    editBikeAdditionalDetailsTextarea.value = results[i].additionaldetails;
                    
                    debugClickedElement.children[1].children[0].innerText = results[i].nickname; // bike tile title
                    debugClickedElement.children[1].getElementsByTagName("ul")[0].children[0].innerText = "Manufacturer: " + results[i].manufacturer; // bike tile manufacturer details preview
                    debugClickedElement.children[1].getElementsByTagName("ul")[0].children[1].innerText = "Model: " + results[i].model; // bike tile model details preview
                    debugClickedElement.children[1].getElementsByTagName("ul")[0].children[2].innerText = "Colour: " + results[i].colour; // bike tile colour details preview

                    result = true;
                }
            }

            if (result == true) {
                console.log("Loaded bikes successfully");
            } else {
                console.log("Error: Failed to load any bikes of yours");
            }
        }
    })
}
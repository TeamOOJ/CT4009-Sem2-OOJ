function deleteBike() {
    document.getElementById("deleteBikePage").style.display = "block";
    document.getElementById("deleteBikePage").style.zIndex = "9999";
}
function hideDeleteBikePage() {
    document.getElementById("deleteBikePage").style.display = "none";
    document.getElementById("deleteBikePage").style.zIndex = "0";
    location.reload(); // refresh the bikes list so that a deleted bike doesn't show up in the list
}


var countFilterCheckbox = document.querySelector('#countFilterCheckbox');
var manufacturerFilterCheckbox = document.querySelector('#manufacturerFilterCheckbox');
var modelFilterCheckbox = document.querySelector('#modelFilterCheckbox');
var typeFilterCheckbox = document.querySelector('#typeFilterCheckbox');
var mpnFilterCheckbox = document.querySelector('#mpnFilterCheckbox');
var colourFilterCheckbox = document.querySelector('#colourFilterCheckbox');
var wheelSizeFilterCheckbox = document.querySelector('#wheelSizeFilterCheckbox');
var noOfGearsFilterCheckbox = document.querySelector('#noOfGearsFilterCheckbox');
var typeOfBreaksFilterCheckbox = document.querySelector('#typeOfBreaksFilterCheckbox');
var suspensionFilterCheckbox = document.querySelector('#suspensionFilterCheckbox');
var genderFilterCheckbox = document.querySelector('#genderFilterCheckbox');
var ageGroupFilterCheckbox = document.querySelector('#ageGroupFilterCheckbox');
var commonParkingPlaceFilterCheckbox = document.querySelector('#commonParkingPlaceFilterCheckbox');
var useCaseFilterCheckbox = document.querySelector('#useCaseFilterCheckbox');

// https://www.w3schools.com/js/js_htmldom_eventlistener.asp

// to be able to parse arguments to a function within addEventListener, you first need to wrap it in an anonymous function for it to work properly
countFilterCheckbox.addEventListener("click", function() {toggleFilter("count")}); // when the state of the checkbox changes, execute the changeFilter() function with the argument of the checkbox changed
manufacturerFilterCheckbox.addEventListener("click", function() {toggleFilter("manufacturer")});
modelFilterCheckbox.addEventListener("click", function() {toggleFilter("model")});
typeFilterCheckbox.addEventListener("click", function() {toggleFilter("type")});
mpnFilterCheckbox.addEventListener("click", function() {toggleFilter("mpn")});
colourFilterCheckbox.addEventListener("click", function() {toggleFilter("colour")});
wheelSizeFilterCheckbox.addEventListener("click", function() {toggleFilter("wheelSize")});
noOfGearsFilterCheckbox.addEventListener("click", function() {toggleFilter("noOfGears")});
typeOfBreaksFilterCheckbox.addEventListener("click", function() {toggleFilter("typeOfBreaks")});
suspensionFilterCheckbox.addEventListener("click", function() {toggleFilter("suspension")});
genderFilterCheckbox.addEventListener("click", function() {toggleFilter("gender")});
ageGroupFilterCheckbox.addEventListener("click", function() {toggleFilter("ageGroup")});
commonParkingPlaceFilterCheckbox.addEventListener("click", function() {toggleFilter("commonParkingPlace")});
useCaseFilterCheckbox.addEventListener("click", function() {toggleFilter("useCase")});

function toggleFilter(column) {
    var bikesTable = document.getElementById("bikesTable");

    console.log("Clicked" + column);

    if (column == "count") {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        bikesTable.classList.toggle("hideCount");
    } else if (column == "manufacturer") {
        bikesTable.classList.toggle("hideManufacturer");
    } else if (column == "model") {
        bikesTable.classList.toggle("hideModel");
    } else if (column == "type") {
        bikesTable.classList.toggle("hideType");
    } else if (column == "mpn") {
        bikesTable.classList.toggle("hideMPN");
    } else if (column == "colour") {
        bikesTable.classList.toggle("hideColour");
    } else if (column == "wheelSize") {
        bikesTable.classList.toggle("hideWheelSize");
    } else if (column == "noOfGears") {
        bikesTable.classList.toggle("hideNoOfGears");
    } else if (column == "typeOfBreaks") {
        bikesTable.classList.toggle("hideTypeOfBreaks");
    } else if (column == "suspension") {
        bikesTable.classList.toggle("hideSuspension");
    } else if (column == "gender") {
        bikesTable.classList.toggle("hideGender");
    } else if (column == "ageGroup") {
        bikesTable.classList.toggle("hideAgeGroup");
    } else if (column == "commonParkingPlace") {
        bikesTable.classList.toggle("hideCommonParkingPlace");
    } else if (column == "useCase") {
        bikesTable.classList.toggle("hideUseCase");
    } else {
        console.log("Warning: Unknown column argument recieved in toggleFilter(). Argument recieved: '" + column + "'.");
    }
}
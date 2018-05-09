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
    var stolenTable = document.getElementById("stolenTable");

    console.log("Clicked" + column);

    if (column == "count") {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        stolenTable.classList.toggle("hideCount");
    } else if (column == "manufacturer") {
        stolenTable.classList.toggle("hideManufacturer");
    } else if (column == "model") {
        stolenTable.classList.toggle("hideModel");
    } else if (column == "type") {
        stolenTable.classList.toggle("hideType");
    } else if (column == "mpn") {
        stolenTable.classList.toggle("hideMPN");
    } else if (column == "colour") {
        stolenTable.classList.toggle("hideColour");
    } else if (column == "wheelSize") {
        stolenTable.classList.toggle("hideWheelSize");
    } else if (column == "noOfGears") {
        stolenTable.classList.toggle("hideNoOfGears");
    } else if (column == "typeOfBreaks") {
        stolenTable.classList.toggle("hideTypeOfBreaks");
    } else if (column == "suspension") {
        stolenTable.classList.toggle("hideSuspension");
    } else if (column == "gender") {
        stolenTable.classList.toggle("hideGender");
    } else if (column == "ageGroup") {
        stolenTable.classList.toggle("hideAgeGroup");
    } else if (column == "commonParkingPlace") {
        stolenTable.classList.toggle("hideCommonParkingPlace");
    } else if (column == "useCase") {
        stolenTable.classList.toggle("hideUseCase");
    } else {
        console.log("Warning: Unknown column argument recieved in toggleFilter(). Argument recieved: '" + column + "'.");
    }
}
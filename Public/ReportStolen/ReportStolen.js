var theftDateSection = document.querySelector("#theftDate");
var theftTimeSection = document.querySelector("#theftTime");

var theftLastKnownLocationSection = document.querySelector("#theftLastKnownLocation");
var theftLocationSection = document.querySelector("#theftLocation");

function toggleTheftDate(element) {
    //console.log(element.checked); // for debugging and for finding out what output to expect

    if (element.checked) {
        theftDateSection.style.display = "inline";
    } else {
        theftDateSection.style.display = "none";
        theftDateSection.getElementsByClassName("theftDate")[0].value = ""; // reset the value to blank if unchecked
    }
}

function toggleTheftTime(element) {
    if (element.checked) {
        theftTimeSection.style.display = "inline";
    } else {
        theftTimeSection.style.display = "none";
        theftTimeSection.getElementsByClassName("theftTime")[0].value = ""; // reset the value to blank if unchecked
    }
}

function toggleTheftLastKnownLocation(element) {
    if (element.checked) {
        theftLastKnownLocationSection.style.display = "inline";
    } else {
        theftLastKnownLocationSection.style.display = "none";
        theftLastKnownLocationSection.getElementsByClassName("theftLastKnownLocation")[0].value = "";
    }
}

function toggleTheftLocation(element) {
    if (element.checked) {
        theftLocationSection.style.display = "inline";
    } else {
        theftLocationSection.style.display = "none";
        theftLocationSection.getElementsByClassName("theftLocation")[0].value = "";
    }
}
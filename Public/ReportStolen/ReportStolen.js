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
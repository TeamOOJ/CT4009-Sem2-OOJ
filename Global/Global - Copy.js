// start of third-party code
// getCookie and setCookie functions from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// end of third-party code

// my code from this point onwards

// my embedded stylesheet overrides within js mini library
var sheet = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
})();
checkHighContrastMode();
function checkHighContrastMode() {
    var highContrastMode = getCookie("highContrastMode");
    if (highContrastMode == "") {
        highContrastMode = "n";
        setCookie("highContrastMode", "n", 365);
        console.log("Debug: highContrastMode is currently unset.");
    } else if (highContrastMode == "y") {
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

        console.log("Debug: highContrastMode is currently set to on.");    
    } else if (highContrastMode == "n") {
        console.log("Debug: highContrastMode is currently set to off.");
        sheet.deleteRule(0); // politely ask the embedded stylesheet js library to delete the styles inside it
        sheet.deleteRule(0);
        sheet.deleteRule(0);
        sheet.deleteRule(0);
        document.getElementsByTagName("style")[0].parentElement.removeChild(document.getElementsByTagName("style")[0]); // attempt to remove the js embedded stylesheet override if still present
    }

    sheet.insertRule(".c-button {text-shadow: #fff 0px 0px 16px;}", 0);
    sheet.insertRule("nav.c-in-page-navigation > ul li > a {color: #000;}", 1);
    sheet.insertRule("nav.c-in-page-navigation > ul li > a.f-active, nav.c-in-page-navigation > ul li > a:active {font-weight: bold;}", 2);
    sheet.insertRule(".c-heading, .c-subheading, .c-heading-1, .c-heading-2, .c-heading-3, .c-heading-4, .c-heading-5, .c-subheading-1, .c-subheading-2, .c-subheading-3, .c-subheading-4, .c-subheading-5 {font-weight: bold;}", 3);
}
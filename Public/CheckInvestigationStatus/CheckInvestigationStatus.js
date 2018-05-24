// http://www.technicaloverload.com/get-value-url-parameters-using-javascript/
function getParameter(theParameter) { 
    var params = window.location.search.substr(1).split('&');
   
    for (var i = 0; i < params.length; i++) {
        var p=params[i].split('=');
        if (p[0] == theParameter) {
            return decodeURIComponent(p[1]);
        }
    }
    return false;
}

if (getParameter('bikeID') != false) {
    document.getElementsByTagName("input")[0].value = getParameter('bikeID').trim();
    document.getElementById("checkStatusBtn").click();
}

function checkStatus(element) {
    bikeID = element.value;

    theIframe = document.getElementById("investigationStatusIframe");
    theIframe.src = "CheckInvestigationStatus.php?bikeID=" + bikeID;
}
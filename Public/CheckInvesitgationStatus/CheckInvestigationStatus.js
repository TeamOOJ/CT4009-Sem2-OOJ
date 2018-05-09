function checkStatus(element) {
    bikeID = element.value;

    theIframe = document.getElementById("investigationStatusIframe");
    theIframe.src = "CheckInvestigationStatus.php?bikeID=" + bikeID;
}
function deleteBike() {
    document.getElementById("deleteBikePage").style.display = "block";
    document.getElementById("deleteBikePage").style.zIndex = "9999";
}
function hideDeleteBikePage() {
    document.getElementById("deleteBikePage").style.display = "none";
    document.getElementById("deleteBikePage").style.zIndex = "0";
    location.reload(); // refresh the bikes list so that a deleted bike doesn't show up in the list
}
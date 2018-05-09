function goHome() {
    if (location.href.contains("/Global/")) {
        location.href = "../../Public/Home/Home.php"; // todo: differentiate police and public
    } else if (location.href.contains("/Public/") || location.href.contains("/Police/")) {
        location.href = "../Home/Home.php"
    }
}
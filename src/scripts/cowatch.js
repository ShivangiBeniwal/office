(function () {

    const logTag = "CoWatch";
    printLog(logTag, ">>> initialize");
    microsoftTeams.initialize();

    printLog(logTag, ">>> getContext");
    microsoftTeams.getContext(context => {
        printLog(logTag, ">>> Inside getContext %s", JSON.stringify(context));
    });

    var start = document.getElementById("start")
    start.onclick = () => {
        var appContentUrl = "https://3efc-139-5-254-252.ngrok.io/#/youtube?providerId=youtube001&organizer=689c4267-cc0c-453d-b730-a4b1a957a2ac&userRole=organizer";
        printLog(logTag, ">>> Start click %s", appContentUrl);
        microsoftTeams.meeting.shareAppContentToStage((error, result) => {
            printLog(logTag, ">>> Inside shareAppContentToStage %s, %s", JSON.stringify(error), result);
        }, appContentUrl);
    }
})();

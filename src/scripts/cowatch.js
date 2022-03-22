(function () {

    const logTag = "CoWatch";
    printLog(logTag, ">>> initialize");
    microsoftTeams.initialize();

    printLog(logTag, ">>> getContext");
    microsoftTeams.getContext(context => {
        printLog(logTag, `>>> Inside getContext ${JSON.stringify(context)}`);
    });

    var start = document.getElementById("start")
    start.onclick = () => {
        const appContentUrl = "https://3efc-139-5-254-252.ngrok.io/#/youtube?providerId=youtube001&organizer=689c4267-cc0c-453d-b730-a4b1a957a2ac&userRole=organizer";
        var ShareToStage = document.querySelector("input[name=ShareToStage]").value;

        printLog(logTag, `Selected value for ShareToStage is ${ShareToStage} - ${ShareToStage == "false"}`)
        if (ShareToStage == "false") {
            window.open(appContentUrl);
        } else {
            microsoftTeams.meeting.shareAppContentToStage((error, result) => {
                printLog(logTag, `>>> Inside shareAppContentToStage ${JSON.stringify(error)}, ${result}`);
            }, appContentUrl);
        }
    }
})();

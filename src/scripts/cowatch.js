(function () {

    console.log(">>> initialize");
    microsoftTeams.initialize();

    console.log(">>> getContext");
    microsoftTeams.getContext(context => {
        console.log(">>> Inside getContext %s", JSON.stringify(context));
    });

    var start = document.getElementById("start")
    start.onclick = () => {
        if (false) {
            window.open("https://329d-139-5-254-252.ngrok.io/");
        } else {
            var appContentUrl = "https://329d-139-5-254-252.ngrok.io/";
            console.log(">>> Start click %s", appContentUrl);
            microsoftTeams.meeting.shareAppContentToStage((error, result) => {
                console.log(">>> Inside shareAppContentToStage %s, %s", JSON.stringify(error), result);
            }, appContentUrl);
        }
    }

})();
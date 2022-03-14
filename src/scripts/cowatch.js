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
            window.open("http://localhost:3001");
        } else {
            var appContentUrl = `${window.location.origin}//cowatch`;
            console.log(">>> Start click %s", appContentUrl);
            microsoftTeams.meeting.shareAppContentToStage((error, result) => {
                console.log(">>> Inside shareAppContentToStage %s, %s", JSON.stringify(error), result);
            }, appContentUrl);
        }
    }

})();
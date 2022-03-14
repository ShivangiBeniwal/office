(function () {

    // Call the initialize API first
    microsoftTeams.initialize();

    var start = document.getElementById("start")
    start.onclick = () => {
        if (false) {
            window.open("http://localhost:3001");
        } else {
            var appContentUrl = 'https://devicecapabilitytestapp.azurewebsites.net/cowatch';
            console.log(">>> Start click %s", appContentUrl);
            microsoftTeams.meeting.shareAppContentToStage((error, result) => {
                console.log(">>> Inside shareAppContentToStage %s, %s", JSON.stringify(error), result);
            }, appContentUrl);
        }
    }

})();
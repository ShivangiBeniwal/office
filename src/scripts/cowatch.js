(function () {

    const logTag = "CoWatch";
    printLog(logTag, ">>> initialize");
    microsoftTeams.initialize();

    printLog(logTag, ">>> getContext");
    microsoftTeams.getContext(context => {
        printLog(logTag, `>>> Inside getContext ${JSON.stringify(context)}`);
    });

    const start = document.getElementById("start")
    const meetingApiType = document.querySelector('#meetingApiType');
    start.onclick = () => {
        const selectOption = meetingApiType.options[meetingApiType.selectedIndex].value;
        printLog(logTag, `>>> Inside OnClick - ${selectOption}`);

        switch (selectOption) {
            case 'state':
                getMeetingState();
                break;
            case 'shareToStage':
                shareToStage();
                break;
        }
    }

    function getMeetingState() {
        printLog(logTag, `>>> Inside getMeetingState`);
        microsoftTeams.meeting.getAppContentStageSharingState((error, result) => {
            printLog(logTag, `>>> Inside getAppContentStageSharingState ${JSON.stringify(error)}, ${JSON.stringify(result)}`);
        });
    }

    function shareToStage() {
        const appContentUrl = `${window.location.origin}//timer`;
        printLog(logTag, `>>> Inside shareToStage ${appContentUrl}`);
        microsoftTeams.meeting.shareAppContentToStage((error, result) => {
            printLog(logTag, `>>> Inside shareAppContentToStage ${JSON.stringify(error)}, ${JSON.stringify(result)}`);
        }, appContentUrl);
    }
})();

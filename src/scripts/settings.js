(function () {

    const logTag = "Settings";
    printLog(logTag, ">>> initialize");
    microsoftTeams.initialize();

    printLog(logTag, ">>> getContext");
    microsoftTeams.getContext(context => {
        printLog(logTag, `>>> Inside getContext ${JSON.stringify(context)}`);
    });

    const start = document.getElementById("start");
    const settingsApiType = document.querySelector('#settingsApiType');
    start.onclick = () => {
        const selectOption = settingsApiType.options[settingsApiType.selectedIndex].value;
        printLog(logTag, `>>> Inside OnClick - ${selectOption}`);

        switch (selectOption) {
            case 'getSettings':
                getSettings();
                break;
            case 'setSettings':
                setSettings();
                break;
        }
    }

    function getSettings() {
        printLog(logTag, `>>> Inside getSettings`);
        microsoftTeams.settings.getSettings((instanceSettings) => {
            printLog(logTag, `>>> Inside getSettings ${JSON.stringify(instanceSettings)}`);
        });
    }

    function setSettings() {
        const tabName = document.getElementById("tabName").value;
        const instanceSettings = {
            suggestedDisplayName: tabName,
            contentUrl: window.location.origin
          }

        printLog(logTag, `>>> Inside setSettings ${JSON.stringify(instanceSettings)}`);
        microsoftTeams.settings.setSettings(instanceSettings, (status, reason) => {
            printLog(logTag, `>>> Inside setSettings ${JSON.stringify(status)}, ${JSON.stringify(reason)}`);
        });
    }
})();

(function () {

    const logTag = "Config";
    const tabType = document.querySelector('#tabType');

    // Call the initialize API first
    microsoftTeams.initialize();
    printLog(logTag, "initialize");

    // Save configuration changes
    microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {

        const selectOption = tabType.options[tabType.selectedIndex].value;

        var tabUrl = `${window.location.origin}//${selectOption}`;

        // Let the Microsoft Teams platform know what you want to load based on
        // what the user configured on this page
        microsoftTeams.settings.setSettings({
            websiteUrl: tabUrl,
            contentUrl: tabUrl, // Mandatory parameter
            entityId: selectOption,    // Mandatory parameter
            suggestedDisplayName: selectOption
        });

        // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
        // for the app to call this API before it dismisses the dialog. If the wait times out, you will
        // see an error indicating that the configuration settings could not be saved.
        saveEvent.notifySuccess();
    });

    microsoftTeams.settings.setValidityState(true);

    const checkButton = document.getElementById('check');
    checkButton.onclick = () => {
        const selectOption = tabType.options[tabType.selectedIndex].value;
        printLog(logTag, `checkButton - ${selectOption}`);
        var tabUrl = `${window.location.origin}/${selectOption}`;
        window.open(tabUrl);
    }

})();
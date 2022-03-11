(function () {

    // Call the initialize API first
    microsoftTeams.initialize();

    // Save configuration changes
    microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {

        var tabUrl = `https://${window.location.origin}//cowatch`;

        // Let the Microsoft Teams platform know what you want to load based on
        // what the user configured on this page
        microsoftTeams.settings.setSettings({
            websiteUrl: tabUrl,
            contentUrl: tabUrl, // Mandatory parameter
            entityId: "CoWatch Config Tab", // Mandatory parameter
            suggestedDisplayName: "CoWatch Config Tab"
        });

        // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
        // for the app to call this API before it dismisses the dialog. If the wait times out, you will
        // see an error indicating that the configuration settings could not be saved.
        saveEvent.notifySuccess();
    });

    microsoftTeams.settings.setValidityState(true);

    var start = document.getElementById("start")
    start.onclick = () => {
        window.open(
            `${window.location.origin}/#${navigationRoute.youtube}?${queryParam.providerId}=${appId}&${queryParam.organizer}=${context?.userObjectId}`,
        );
    }

})();
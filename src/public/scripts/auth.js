(function() {
  function initializeAuth() {
    printLog("initializeAuth");

    var btn = document.getElementById("promptForConsentButton");
    btn.onclick = () => {
      getAuthToken();
    };
  }

  function getAuthToken() {
    var authTokenRequest = {
      successCallback: result => {
        printLog("Token received: " + result);
      },
      failureCallback: function(error) {
        printLog("Error getting token: " + error);
      }
    };

    printLog("Get Auth Token Call is made.");
    microsoftTeams.authentication.getAuthToken(authTokenRequest);
  }

  initializeAuth();
})();

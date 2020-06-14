(function() {
  "use strict";

  function initializeConsentButton() {
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

  function printLog(msg) {
    var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
    var logDiv = document.getElementById("logs");
    var p = document.createElement("p");
    logDiv.prepend(finalMessage, p);
    console.log("Auth: " + finalMessage);
  }

  // ------------------------------------------------------------------------

  function getCurrentDateTime() {
    var today = new Date();
    var date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    return dateTime;
  }

  initializeConsentButton();
})();

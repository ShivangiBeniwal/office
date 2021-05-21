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
      successCallback: function(result) {
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
    p.innerText = finalMessage;
    logDiv.insertBefore(p, logDiv.firstChild);

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

  initializeAuth();
})();


// import * as microsoftTeams from '@microsoft/teams-js';

// export const initializeAuth = () => {
//   printLog("initializeAuth");

//   // Call the initialize API first
//   microsoftTeams.initialize();

//   var btn = document.getElementById("promptForConsentButton") as HTMLButtonElement;
//   btn.onclick = () => {
//     getAuthToken();
//   };

//   function getAuthToken() {
//     var authTokenRequest = {
//       successCallback: function(result: string) {
//         printLog("Token received: " + result);
//       },
//       failureCallback: function(error: string) {
//         printLog("Error getting token: " + error);
//       }
//     } as microsoftTeams.authentication.AuthTokenRequest;

//     printLog("Get Auth Token Call is made.");
//     microsoftTeams.authentication.getAuthToken(authTokenRequest);
//   }

//   function printLog(msg? : string) {
//     var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
//     var logDiv = document.getElementById("logs") as HTMLDivElement;
//     var p = document.createElement("p") as HTMLParagraphElement;
//     p.innerText = finalMessage;
//     logDiv.insertBefore(p, logDiv.firstChild);

//     console.log("Auth: " + finalMessage);
//   }

//   // ------------------------------------------------------------------------

//   function getCurrentDateTime() {
//     var today = new Date();
//     var date =
//       today.getDate() +
//       "/" +
//       (today.getMonth() + 1) +
//       "/" +
//       today.getFullYear();
//     var time =
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date + " " + time;

//     return dateTime;
//   }
// };

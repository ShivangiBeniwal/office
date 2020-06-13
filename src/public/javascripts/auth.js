(function() {
    'use strict';
 /*
    // 1. Get auth token
    // Ask Teams to get us a token from AAD, we should exchange it when it n
    function getAuthToken(){
        // Get auth token
        var authTokenRequest = {
            successCallback: (result) =>  {
                printLog("Token received: " + result);
                // sendTokenToBackend(result);
            },
            failureCallback: function(error) { 
                printLog("Error getting token: " + error);
            },
        };

        printLog("Get Auth Token Call is made.");
        microsoftTeams.authentication.getAuthToken(authTokenRequest);
    }

    // 2. Send token to the backend
    // After we call getAuthToken, we need to send the token from that request to the backend to 
    // verify that we have the correct permissions (or do an on-behalf-of exchange to get a new token) 
    function sendTokenToBackend(result){
        printLog("Token received: " + result)
        printLog("Sending token to backend for AAD on-behalf-of exchange")

        // Get Tenant ID
        var getContextPromise = new Promise((resolve, reject) => {
            microsoftTeams.getContext(function(context){
                resolve(context);
            });
        });

        // Send Tenant ID and token to backend
        getContextPromise.then(function(context) {
            // POST result to backend
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/auth/token", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            // Set response handler before sending
            xhr.onreadystatechange = function () {
                if (this.readyState != 4) return;
                if (this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    handleServerResponse(data);
                }
            };
            // send POST request
            xhr.send(JSON.stringify({ "tid": context.tid, "token": result })); 
        });
    }

    // 3. Ask for additional consent from the user
    // If the on-behalf-of-flow failed due to requiring further consent, then we need to have the
    // user click a button to show the AAD consent dialog and ask for additional permission
    function initializeConsentButton() {
        var btn = document.getElementById("promptForConsentButton")
        btn.onclick = () => {
            getAuthToken();
            // microsoftTeams.authentication.authenticate({
            //     url: window.location.origin + "/auth/auth-start",
            //     width: 600,
            //     height: 535,
            //     successCallback: function (result) {
            //         let data = localStorage.getItem(result);
            //         localStorage.removeItem(result);
            //         printLog("Success! Additional permission granted. Result: " + data)
            //         // let tokenResult = JSON.parse(data);
            //     },
            //     failureCallback: function (reason) {
            //         printLog("Failure. Additional permission was not granted. Result: " + JSON.stringify(reason))
            //         // handleAuthError(reason);
            //     }
            // });
        }
    }

    function handleServerResponse(data) {
        printLog("Backend returned: " + JSON.stringify(data));
        var error = data.error;
        // Error: enable the grantPermission button
        if (error != null) {
            printLog("Enabling the 'Grant Permission' button");
            document.getElementById("promptForConsentButton").disabled = false
        // Success: server returned a valid acess token
        } else {
            printLog("Success! You have a valid token from your backend with extra permissions.");
        }

    }
*/

    var startTime;
    var maxCount = 1000;
    function checkPerformance() {
        printLogItem("hi = ");
        var btn = document.getElementById("promptForAuthPerf");
        printLogItem("maxCount = " + maxCount);
        // btn.onclick = () => {
        //     printLogItem("StartTime = " + getCurrentDateTime());
        //     maxCount = document.querySelector('input[name=countVal]').value;
        //     startTime = new Date().getTime();
        //     printLogItem("StartTime = " + startTime);

        //     // for ( var i = 1; i <= maxCount; i++) {
        //     //     getAuthTokenWithCount(i);
        //     // }
        // }
    }

    function getAuthTokenWithCount(count) {
        // Get auth token
        var authTokenRequest = {
            successCallback: (result) =>  {
                document.getElementById('countSuccess').innerHTML = "Total success calls - " + count;
                if (count == maxCount) {
                    printEndtime();
                }
            },
            failureCallback: function(error) { 
                document.getElementById('countError').innerHTML = "Total error calls - " + count;
                if (count == maxCount) {
                    printEndtime();
                }
            },
        };
        microsoftTeams.authentication.getAuthToken(authTokenRequest);
    }

    function printEndtime() {
        var endTime = new Date().getTime();
        printLogItem("EndTime = " + endTime);
        printLogItem("Total time taken = " + (endTime - startTime) + " ms");
    }

    function printLogItem(text) {
        var node = document.createElement("li");
        var textNode = document.createTextNode(text);
        node.appendChild(textNode);
        document.getElementById('logItems').appendChild(node);
    }

    // ------------------------------------------------------------------------

    function getCurrentDateTime() {
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        return dateTime;
    }

    function printLog(msg) {
        var finalMessage = '['+getCurrentDateTime()+'] '+msg;
        var logDiv = document.getElementById('logs');
        var p = document.createElement("p");
        logDiv.prepend(finalMessage, p);
        console.log("Auth : " + finalMessage);
    }

    // initializeConsentButton();

    // getAuthToken();

    checkPerformance();
    
})();
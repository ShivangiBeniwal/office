(function() {
    'use strict';

    function initializeConsentButton() {
        var btn = document.getElementById("promptForConsentButton")
        btn.onclick = () => {
            getAuthToken();
        }
    }

    function getAuthToken(){
        // Get auth token
        var authTokenRequest = {
            successCallback: (result) =>  {
                printLog("Token received : " + result);
            },
            failureCallback: function(error) { 
                printLog("Error getting token : " + error);
            },
        };

        printLog("Get Auth Token Call is made.");
        microsoftTeams.authentication.getAuthToken(authTokenRequest);
    }

    function printLog(msg) {
        var finalMessage = '['+getCurrentDateTime()+'] '+msg;
        var logDiv = document.getElementById('logs');
        var p = document.createElement("p");
        logDiv.prepend(finalMessage, p);
        console.log("Auth : " + finalMessage);
    }

    // ------------------------------------------------------------------------

    

    initializeConsentButton();
    
})();

function clickAuthPerf() {
    var startTime;
    var maxCount = 1000;
    function checkPerformance() {
        // var btn = document.getElementById("promptForAuthPerf");
        // btn.onclick = () => {
            maxCount = document.querySelector('input[name=countVal]').value;
            startTime = new Date().getTime();
            printLogItem("StartTime = " + getCurrentDateTime());

            for ( var i = 1; i <= maxCount; i++) {
                getAuthTokenWithCount(i);
            }
        // }
    }

    function getAuthTokenWithCount(count) {
        // Get auth token
        var authTokenRequest = {
            successCallback: (result) =>  {
                document.getElementById('countSuccess').innerHTML = "Total success calls : " + count;
                if (count == maxCount) {
                    printEndtime();
                }
            },
            failureCallback: function(error) { 
                document.getElementById('countError').innerHTML = "Total error calls : " + count;
                if (count == maxCount) {
                    printEndtime();
                }
            },
        };
        microsoftTeams.authentication.getAuthToken(authTokenRequest);
    }

    function printEndtime() {
        var endTime = new Date().getTime();
        printLogItem("EndTime = " + getCurrentDateTime());
        printLogItem("Total time taken = " + (endTime - startTime) + " ms\n");
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
}
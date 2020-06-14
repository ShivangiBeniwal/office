(function() {
    "use strict";

    var startTime;

    var rowId = 0;
  
    var maxCount = 1000;
  
    function checkPerformance() {
      var btn = document.getElementById("promptForAuthPerf");
      btn.onclick = () => {
        createNewRowWithId();
        maxCount = document.querySelector("input[name=countVal]").value;
        startTime = new Date().getTime();
        document.getElementById('startTime').innerHTML = getCurrentDateTime();
  
        for (var i = 1; i <= maxCount; i++) {
          getAuthTokenWithCount(i);
        }
      };
    }

    function createNewRowWithId() {
        var row = document.getElementById('resultTableBody').insertRow(0);
        row.id = rowId++;
        return row;
    }
  
    function getAuthTokenWithCount(count) {
      // Get auth token
      var authTokenRequest = {
        successCallback: result => {
          document.getElementById("countSuccess").innerHTML = count;
  
          if (count == maxCount) {
            printEndtime();
          }
        },
        failureCallback: function(error) {
          document.getElementById("countError").innerHTML = count;
  
          if (count == maxCount) {
            printEndtime();
          }
        }
      };
      microsoftTeams.authentication.getAuthToken(authTokenRequest);
    }
  
    function printEndtime() {
      var endTime = new Date().getTime();
      document.getElementById('endTime').innerHTML = getCurrentDateTime();
      document.getElementById('totalTime').innerHTML = (endTime - startTime) + " ms";
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
  
    checkPerformance();
  })();
  
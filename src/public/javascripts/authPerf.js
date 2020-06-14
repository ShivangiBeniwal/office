(function() {
    "use strict";

    var startTime;

    var rowId = 0;
  
    var maxCount = 1000;
  
    function checkPerformance() {
      var btn = document.getElementById("promptForAuthPerf");
      btn.onclick = () => {
        createNewRow();
        maxCount = document.querySelector("input[name=countVal]").value;

        startTime = new Date().getTime();
        document.getElementById('startTime'+rowId).innerHTML = getCurrentDateTime();
  
        for (var i = 1; i <= maxCount; i++) {
          getAuthTokenWithCount(i);
        }
      };
    }

    function createNewRow() {
        var tableBody = document.getElementById('resultTableBody');
        var row = document.createElement('tr');
        row.id = rowId;

        row.appendChild(createCell('countSuccess'+rowId));
        row.appendChild(createCell('countError'+rowId));
        row.appendChild(createCell('startTime'+rowId));
        row.appendChild(createCell('endTime'+rowId));
        row.appendChild(createCell('totalTime'+rowId));

        tableBody.insertBefore(row, tableBody.firstChild);
    }

    function createCell(cellId) {
        var cell = document.createElement('td');
        cell.id = cellId;
        cell.innerHTML = "-"; 

        return cell;
    }
  
    function getAuthTokenWithCount(count) {
      // Get auth token
      var authTokenRequest = {
        successCallback: result => {
          document.getElementById('countSuccess'+rowId).innerHTML = count;
  
          if (count == maxCount) {
            printEndtime();
          }
        },
        failureCallback: function(error) {
          document.getElementById('countError'+rowId).innerHTML = count;
  
          if (count == maxCount) {
            printEndtime();
          }
        }
      };
      microsoftTeams.authentication.getAuthToken(authTokenRequest);
    }
  
    function printEndtime() {
      var endTime = new Date().getTime();
      document.getElementById('endTime'+rowId).innerHTML = getCurrentDateTime();
      document.getElementById('totalTime'+rowId).innerHTML = (endTime - startTime) + " ms";
      rowId++;
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
  
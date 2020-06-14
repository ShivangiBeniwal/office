(function() {
  "use strict";

  var rowId = 0;
  var startTime;
  var countSuccess = 0;
  var countError = 0;

  var maxCount = 1000;
  var batchCount = maxCount;
  var batchInterval = 0;

  function checkPerformance() {
    var btn = document.getElementById("promptForAuthPerf");
    btn.onclick = () => {
      createNewRow();
      init();

      for (var i = 1, ct = 1; i <= maxCount; i++, ct++) {
        if (ct == batchCount) {
          wait(batchInterval);
          ct = 1;
        }
        getAuthTokenWithCount(i);
      }
    };
  }

  function createNewRow() {
    var tableBody = document.getElementById("resultTableBody");
    var row = document.createElement("tr");
    row.id = rowId;

    row.appendChild(createCell("queryDetails" + rowId));
    row.appendChild(createCell("totalCount" + rowId));
    row.appendChild(createCell("startTime" + rowId));
    row.appendChild(createCell("endTime" + rowId));
    row.appendChild(createCell("totalTime" + rowId));

    tableBody.insertBefore(row, tableBody.firstChild);
  }

  function createCell(cellId) {
    var cell = document.createElement("td");
    cell.id = cellId;
    cell.innerHTML = "-";

    return cell;
  }

  function init() {
    var totalCount = document.querySelector("input[name=totalCount]").value;
    var bCount = document.querySelector("input[name=batchCount]").value;
    var bInterval = document.querySelector("input[name=batchInterval]").value;
    document.getElementById("queryDetails" + rowId).innerHTML = "Total count : " + totalCount + "\nBatch count : " + bCount + "\nBatch Interval : " + bInterval + " ms";

    maxCount = totalCount > 0 ? totalCount : maxCount;
    batchCount = bCount > 0 ? bCount : maxCount;
    batchInterval = bInterval > 0 ? bInterval : batchInterval;
    document.getElementById("queryDetails" + rowId).innerHTML = "Total count : " + maxCount + "\nBatch count : " + batchCount + "\nBatch Interval : " + batchInterval + " ms";

    countSuccess = 0;
    countError = 0;

    startTime = new Date().getTime();
    document.getElementById("startTime" + rowId).innerHTML = getCurrentDateTime();
  }

  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  function getAuthTokenWithCount(count) {
    // Get auth token
    var authTokenRequest = {
      successCallback: result => {
        countSuccess++;
        printCallCount();

        if (count == maxCount) {
          printEndtime();
        }
      },
      failureCallback: function(error) {
        countError++;
        printCallCount();

        if (count == maxCount) {
          printEndtime();
        }
      }
    };
    microsoftTeams.authentication.getAuthToken(authTokenRequest);
  }

  function printCallCount() {
    document.getElementById("totalCount" + rowId).innerHTML = "(" + countSuccess + "/" + countError + ")";
  }

  function printEndtime() {
    var endTime = new Date().getTime();
    document.getElementById("endTime" + rowId).innerHTML = getCurrentDateTime();
    document.getElementById("totalTime" + rowId).innerHTML = endTime - startTime + " ms";
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

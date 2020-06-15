(function() {
  "use strict";

  var rowId = 0;
  var startTime;
  var countSuccess = 0;
  var countError = 0;

  var defaultCount = 10;
  var maxCount = defaultCount;
  var batchCount = defaultCount;
  var batchInterval = 0;

  var storageList = new Map();

  function checkPerformance() {
    var btn = document.getElementById("promptForAuthPerf");
    btn.onclick = () => {
      createNewRow();
      init();
      makeAuthCall(0, batchCount);
    };
  }

  function makeAuthCall(batchNo, callCounts) {
    var finalCallCounts = callCounts;
    while (callCounts > 0) {
        var ct = (batchNo * batchCount) + (finalCallCounts - callCounts + 1);
        getAuthTokenWithCount(ct);
        callCounts--;
    }
    
    var leftOverCalls = maxCount - finalCallCounts - (batchNo * batchCount);
    if (leftOverCalls > 0) {
        if (batchInterval > 0) {
            setTimeout(function () {
                makeAuthCall(batchNo + 1, Math.min(leftOverCalls, batchCount));
              }, batchInterval);
          } else {
              makeAuthCall(batchNo + 1, Math.min(leftOverCalls, batchCount));
          }
      }
  }

  function printLogs(msg) {
    var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
    var logDiv = document.getElementById("logs");
    var p = document.createElement("p");
    logDiv.prepend(finalMessage, p);
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
    row.appendChild(createCell("collapsible" + rowId));
    tableBody.insertBefore(row, tableBody.firstChild);

    var collapsibleItem = document.getElementById("collapsible" + rowId);
    var button = document.createElement('button');
    button.className = "collapsible";
    button.id = "collapsible" + rowId;
    button.innerHTML = "Show Details";
    collapsibleItem.innerText = "";
    collapsibleItem.appendChild(button);

    var div = document.createElement('div');
    div.className = "details";
    div.id = "details" + rowId;
    collapsibleItem.appendChild(div);

    button.onclick = () => {
        button.classList.toggle("active");
        var details = button.nextElementSibling;
        if (details.style.maxHeight) {
            button.innerHTML = "Show Details";
            details.style.maxHeight = null;
        } else {
            button.innerHTML = "Hide Details";
            details.style.maxHeight = details.scrollHeight + "px";
        } 
    };
  }

  function createCell(cellId) {
    var cell = document.createElement("td");
    cell.id = cellId;
    cell.innerHTML = "-";

    return cell;
  }

  function init() {
    batchInterval = 0;
    countSuccess = 0;
    countError = 0;

    var totalCount = document.querySelector("input[name=totalCount]").value;
    var bCount = document.querySelector("input[name=batchCount]").value;
    var bInterval = document.querySelector("input[name=batchInterval]").value;

    maxCount = totalCount > 0 ? totalCount : defaultCount;
    batchCount = bCount > 0 ? bCount : maxCount;
    batchInterval = bInterval > 0 ? bInterval : batchInterval;
    document.getElementById("queryDetails" + rowId).innerHTML = "Total count : " + maxCount + "<br>Batch count : " + batchCount + "<br>Batch Interval : " + batchInterval + " ms";

    var detailListMap = new Map();
    for (var t = 1; t <= maxCount; t++) {
        var time = new Date().getTime();
        var detailList = {
            id : t,
            startTimeItem: time,
            endTimeItem: time,
            totalTimeItem : 0
        }
        detailListMap.set(t, detailList);
    }
    storageList.set(rowId, detailListMap);
  }

  function getAuthTokenWithCount(count) {
    var detailListMap = storageList.get(rowId);
    var detailList = detailListMap.get(count);

    if (count == 1) {
        startTime = new Date().getTime();
        document.getElementById("startTime" + rowId).innerHTML = getCurrentDateTime();
    }

    if (detailList.id == count) {
        detailList.startTimeItem = new Date().getTime();
        detailListMap.set(count, detailList);
        storageList.set(rowId, detailListMap);
    }

    var authTokenRequest = {
      successCallback: result => {
        countSuccess++;
        printCallCount(count);

        if (count == maxCount) {
          printEndtime();
        }
      },
      failureCallback: function(error) {
        countError++;
        printCallCount(count);

        if (count == maxCount) {
          printEndtime();
        }
      }
    };
    microsoftTeams.authentication.getAuthToken(authTokenRequest);
  }

  function printCallCount(count) {
    var detailListMap = storageList.get(rowId);
    var detailList = detailListMap.get(count);

    if (detailList.id == count) {
        detailList.endTimeItem = new Date().getTime();
        detailList.totalTimeItem = detailList.endTimeItem - detailList.startTimeItem;
        detailListMap.set(count, detailList);
        storageList.set(rowId, detailListMap);
    }
    document.getElementById("totalCount" + rowId).innerHTML = "(" + countSuccess + "/" + countError + ")";
  }

  function printEndtime() {
    var endTime = new Date().getTime();
    document.getElementById("endTime" + rowId).innerHTML = getCurrentDateTime();
    document.getElementById("totalTime" + rowId).innerHTML = endTime - startTime + " ms";

    var detailsDiv = document.getElementById("details" + rowId);
    var detailListMap = storageList.get(rowId);
    var prevEndTime;

    for (var it = 1; it <= maxCount; it++) {
        var detailList = detailListMap.get(it);
        var p =  document.createElement('p');
        p.innerHTML = detailList.id + ") " + detailList.startTimeItem + " to " + detailList.endTimeItem + " : " + detailList.totalTimeItem;

        if (it == 1) {
            prevEndTime = detailList.endTimeItem;
        } else {
            p.innerHTML += " - "+ (detailList.endTimeItem - prevEndTime);
            prevEndTime = detailList.endTimeItem;
        }

        detailsDiv.appendChild(p);
    }

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

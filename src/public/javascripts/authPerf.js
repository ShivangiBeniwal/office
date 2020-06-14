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

      for (var i = 1, ct = 1; i <= maxCount; i++, ct++) {
        if (ct == batchCount) {
            setTimeout(getAuthTokenWithCount(i), batchInterval);
            ct = 1;
        } else {
            getAuthTokenWithCount(i);
        }
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
    row.appendChild(createCell("collapsible" + rowId));
    tableBody.insertBefore(row, tableBody.firstChild);

    var collapsibleItem = document.getElementById("collapsible" + rowId);
    var button = document.createElement('button');
    button.className = "collapsible";
    button.id = "collapsible" + rowId;
    button.innerHTML = "Arrow";
    collapsibleItem.appendChild(button);

    var div = document.createElement('div');
    div.className = "details";
    div.id = "details" + rowId;
    div.innerHTML = "details rowId"+rowId;
    tableBody.insertBefore(div, tableBody.childNodes[1]);

    button.onclick = () => {
        button.classList.toggle("active");
        var details = document.getElementById("details" + rowId);
        if (details.style.maxHeight) {
           details.style.maxHeight = null;
        } else {
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

    var detailListArray = new Map();
    for (var t = 1; t <= maxCount; t++) {
        var time = new Date().getTime();
        var detailList = {
            id : t,
            startTimeItem: time,
            endTimeItem: time,
            totalTimeItem : 0
        }
        detailListArray.set(t, detailList);
    }
    storageList.set(rowId, detailListArray);

    startTime = new Date().getTime();
    document.getElementById("startTime" + rowId).innerHTML = getCurrentDateTime();
  }

  function getAuthTokenWithCount(count) {
    var detailListArray = storageList.get(rowId);
    var detailList = detailListArray.get(count);

    if (detailList.id == count) {
        detailList.startTimeItem = new Date().getTime();
        detailListArray.set(count, detailList);
        storageList.set(rowId, detailListArray);
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
    var detailListArray = storageList.get(rowId);
    var detailList = detailListArray.get(count);

    if (detailList.id == count) {
        detailList.endTimeItem = new Date().getTime();
        detailList.totalTimeItem = detailList.endTimeItem - detailList.startTimeItem;
        detailListArray.set(count, detailList);
        storageList.set(rowId, detailListArray);
    }
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

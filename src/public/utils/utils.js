export function printLog(msg, logTag) {
  var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
  var logDiv = document.getElementById("logs");
  var p = document.createElement("p");
  p.innerText = finalMessage;
  logDiv.insertBefore(p, logDiv.firstChild);

  console.log(logTag + ": " + finalMessage);
}

// ------------------------------------------------------------------------

export function getCurrentDateTime() {
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
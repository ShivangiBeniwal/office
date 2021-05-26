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

export function printLog(logTag: string, msg?: string) {
  var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
  var logDiv = document.getElementById("logs") as HTMLDivElement;
  var p = document.createElement("p") as HTMLParagraphElement;
  p.innerText = finalMessage;
  logDiv.insertBefore(p, logDiv.firstChild);

  // Commented this for now since WebChromeClient.onConsoleMessage is throwimg ANR
  // console.log(logTag + ": " + finalMessage);
}

// ------------------------------------------------------------------------
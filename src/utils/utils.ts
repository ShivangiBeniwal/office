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
  var finalMessage = "[" + getCurrentDateTime() + "] " + msg
  var logDiv = document.getElementById("logs") as HTMLDivElement
  var p = document.createElement("p") as HTMLParagraphElement
  p.innerText = finalMessage
  logDiv.insertBefore(p, logDiv.firstChild)
  console.log(logTag + ": " + finalMessage);
}

export function formatFileSize(bytes: number, decimalPoint: number = 0) {
  if(bytes == 0) return '0 Bytes';
  var k = 1020,
      dm = decimalPoint < 0 ? 0 : decimalPoint,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// ------------------------------------------------------------------------
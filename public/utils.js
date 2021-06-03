"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFileSize = exports.printLog = exports.getCurrentDateTime = void 0;
function getCurrentDateTime() {
    var today = new Date();
    var date = today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    return dateTime;
}
exports.getCurrentDateTime = getCurrentDateTime;
function printLog(logTag, msg) {
    var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
    var logDiv = document.getElementById("logs");
    var p = document.createElement("p");
    p.innerText = finalMessage;
    p.style.width = '300px';
    logDiv.insertBefore(p, logDiv.firstChild);
    // Commented this for now since WebChromeClient.onConsoleMessage is throwimg ANR
    // console.log(logTag + ": " + finalMessage);
}
exports.printLog = printLog;
function formatFileSize(bytes, decimalPoint = 0) {
    if (bytes == 0)
        return '0 Bytes';
    var k = 1020, dm = decimalPoint < 0 ? 0 : decimalPoint, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
exports.formatFileSize = formatFileSize;
// ------------------------------------------------------------------------
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0Isa0JBQWtCO0lBQ2hDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBSSxJQUFJLEdBQ04sS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNmLEdBQUc7UUFDSCxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEIsR0FBRztRQUNILEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QixJQUFJLElBQUksR0FDTixLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3pFLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBRWpDLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFiRCxnREFhQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxNQUFjLEVBQUUsR0FBWTtJQUNuRCxJQUFJLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQzFELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFtQixDQUFBO0lBQzlELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUF5QixDQUFBO0lBQzNELENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFBO0lBQzFCLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtJQUN2QixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFekMsZ0ZBQWdGO0lBQ2hGLDZDQUE2QztBQUMvQyxDQUFDO0FBVkQsNEJBVUM7QUFFRCxTQUFnQixjQUFjLENBQUMsS0FBYSxFQUFFLGVBQXVCLENBQUM7SUFDcEUsSUFBRyxLQUFLLElBQUksQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksRUFDUixFQUFFLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQ3hDLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ2pFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sVUFBVSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBUEQsd0NBT0M7QUFFRCwyRUFBMkUifQ==
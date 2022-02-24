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
    logDiv.insertBefore(p, logDiv.firstChild);
    console.log(logTag + ": " + finalMessage);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0Isa0JBQWtCO0lBQ2hDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBSSxJQUFJLEdBQ04sS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNmLEdBQUc7UUFDSCxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEIsR0FBRztRQUNILEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QixJQUFJLElBQUksR0FDTixLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3pFLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBRWpDLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFiRCxnREFhQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxNQUFjLEVBQUUsR0FBWTtJQUNuRCxJQUFJLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQzFELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFtQixDQUFBO0lBQzlELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUF5QixDQUFBO0lBQzNELENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFBO0lBQzFCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQVBELDRCQU9DO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLEtBQWEsRUFBRSxlQUF1QixDQUFDO0lBQ3BFLElBQUcsS0FBSyxJQUFJLENBQUM7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUNoQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQ1IsRUFBRSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUN4QyxLQUFLLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUNqRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxPQUFPLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQVBELHdDQU9DO0FBRUQsMkVBQTJFIn0=
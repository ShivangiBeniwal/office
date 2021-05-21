"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printLog = exports.getCurrentDateTime = void 0;
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
// ------------------------------------------------------------------------
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0Isa0JBQWtCO0lBQ2hDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBSSxJQUFJLEdBQ04sS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNmLEdBQUc7UUFDSCxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEIsR0FBRztRQUNILEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QixJQUFJLElBQUksR0FDTixLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3pFLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBRWpDLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFiRCxnREFhQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxNQUFjLEVBQUUsR0FBWTtJQUNuRCxJQUFJLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQzNELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFtQixDQUFDO0lBQy9ELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUF5QixDQUFDO0lBQzVELENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQzNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQVJELDRCQVFDO0FBRUQsMkVBQTJFIn0=